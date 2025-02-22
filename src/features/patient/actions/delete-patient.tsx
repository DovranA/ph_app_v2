"use server";

import { patientRepository } from "@/entities/patient/repositories/patient";

import { z } from "zod";

export type PatientDeleteFormState = {
  formData?: FormData;
  errors?: {
    id?: string;
    _errors?: string;
  };
  success?: boolean;
};

const formDataSchema = z.object({
  id: z.string(),
});

export const deletePatientAction = async (
  _: PatientDeleteFormState,
  formData: FormData
): Promise<PatientDeleteFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);
  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        id: formattedErrors.id?._errors.join(","),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }
  try {
    await patientRepository.deletePatient(result.data.id);

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
