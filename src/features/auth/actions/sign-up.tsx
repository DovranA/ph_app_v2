"use server";

import { DoctorSchema } from "@/entities/doctor/domain";
import { createDoctor, sessionService } from "@/entities/doctor/server";
import { redirect } from "next/navigation";

import { z } from "zod";

export type SignUnFormState = {
  formData?: FormData;
  errors?: {
    firstName?: string;
    secondName?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  firstName: z.string().min(3),
  secondName: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (
  state: SignUnFormState,
  formData: FormData
): Promise<SignUnFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);
  let createDoctorResult: (DoctorSchema & { id: string }) | null = null;
  let errors: string | undefined = undefined;
  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        firstName: formattedErrors.firstName?._errors.join(", "),
        secondName: formattedErrors.secondName?._errors.join(", "),
        password: formattedErrors.password?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }
  try {
    createDoctorResult = await createDoctor({
      ...result.data,
      doctorName: `${result.data.firstName}_${result.data.secondName}`,
    });
  } catch (error: any) {
    errors = error;
  }

  if (createDoctorResult) {
    await sessionService.addSession({
      doctorName: createDoctorResult.doctorName,
      id: createDoctorResult.id,
    });

    redirect("/");
  }

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
