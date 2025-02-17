"use server";

import { DoctorEntity } from "@/entities/doctor/domain";
import { sessionService, verifyDoctorPassword } from "@/entities/doctor/server";

import { redirect } from "next/navigation";

import { z } from "zod";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    doctorName?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  doctorName: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (
  state: SignInFormState,
  formData: FormData
): Promise<SignInFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);
  let errors: any = undefined;
  let verifyUserResult: DoctorEntity | null = null;
  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        doctorName: formattedErrors.doctorName?._errors.join(", "),
        password: formattedErrors.password?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }
  try {
    verifyUserResult = await verifyDoctorPassword(result.data);
  } catch (error: any) {
    errors = error.message; // Capture the error message
  }

  if (verifyUserResult?.doctorName) {
    await sessionService.addSession(verifyUserResult);
    redirect("/");
  }

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
