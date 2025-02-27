"use server";

import { patientRepository } from "@/entities/patient/repositories/patient";
import cuid from "cuid";

import { z } from "zod";

export type PatientFormState = {
  formData?: FormData;
  errors?: {
    firstName?: string;
    secondName?: string;
    birthday?: string;
    gender?: string;
    address?: string;
    diagnose?: string;
    enterAt?: string;
    _errors?: string;
  };
  success?: boolean;
};

const formDataSchema = z.object({
  firstName: z.string().min(3),
  secondName: z.string().min(3),
  gender: z.enum(["M", "F"]),
  address: z.string(),
  diagnose: z.string(),
  birthday: z
    .string()
    .min(3)
    .transform((val) => new Date(val)),
  enterAt: z
    .string()
    .min(3)
    .transform((val) => new Date(val)),
  doctorId: z.string(),
});

export const editPatientAction = async (
  _: PatientFormState,
  formData: FormData
): Promise<PatientFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);
  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        firstName: formattedErrors.firstName?._errors.join(","),
        secondName: formattedErrors.secondName?._errors.join(","),
        gender: formattedErrors.gender?._errors.join(","),
        enterAt: formattedErrors.enterAt?._errors.join(","),
        diagnose: formattedErrors.diagnose?._errors.join(","),
        address: formattedErrors.address?._errors.join(", "),
        birthday: formattedErrors.birthday?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }
  try {
    await patientRepository.updatePatient({
      ...result.data,
      id: cuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      medicalHistory: "",
    });
    return {
      formData: new FormData(),
      errors: undefined,
      success: true,
    };
  } catch (error: any) {
    return {
      formData,
      errors: {
        _errors: error,
      },
    };
  }
};
