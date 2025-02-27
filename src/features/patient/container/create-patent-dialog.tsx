"use client";

import { FormDataSchema, Inputs } from "../actions/create-patient";
import { PatientFormDialog } from "../ui/patent-form-dialog";
import { ErrorMessage } from "@/features/auth/ui/submit-button copy";
import { PatentFormFields } from "../ui/patient-form-fields";
import { ReactNode, useEffect, useState } from "react";
import { Analyze, Patient } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
type Props = {
  doctorId?: string;
  patientId?: string;
  actions: ReactNode;
};

export function CreatePatentForm({ doctorId, patientId, actions }: Props) {
  const router = useRouter();
  const createMethod = async (body: Inputs) => {
    try {
      const res = await fetch(`/api/patient/${patientId ? patientId : ""}`, {
        body: JSON.stringify({ ...body, doctorId }),
        method: patientId ? "PATCH" : "POST",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const fetchPatientData = async (id?: string) => {
    try {
      const res = await fetch(`/api/patient/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (patientId) {
      const getData = async () => {
        const data = (await fetchPatientData(patientId)) as Patient;
        if (data) {
          const { id, createdAt, updatedAt, medicalHistory, gender, ...other } =
            data;
          reset({
            ...other,
            gender: gender as "M" | "F",
            diagnose: other.diagnose ?? undefined,
          });
        }
      };
      getData();
    }
  }, [patientId, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createMethod(data);
  };
  return (
    <PatientFormDialog
      title={patientId ? "Näsagy üýtgetmek" : "Näsag goşmak"}
      description=""
      action={handleSubmit(onSubmit)}
      fields={
        <PatentFormFields
          doctorId={doctorId}
          register={register}
          control={control}
          errors={errors}
        />
      }
      actions={actions}
      error={<ErrorMessage error={errors && errors.root?._errors.message} />}
    />
  );
}
