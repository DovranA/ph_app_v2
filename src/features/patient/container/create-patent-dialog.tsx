"use client";

import { useActionState } from "@/shared/lib/react";
import {
  createPatientAction,
  PatientFormState,
} from "../actions/create-patient";
import { PatientFormDialog } from "../ui/patent-form-dialog";
import { ErrorMessage } from "@/features/auth/ui/submit-button copy";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { PatentFormFields } from "../ui/patient-form-fields";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Analyze, Patient } from "@prisma/client";

type Props = {
  doctorId?: string;
  patientId?: string;
  actions: ReactNode;
};

export function CreatePatentForm({ doctorId, patientId, actions }: Props) {
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [formState, action, isPending] = useActionState(createPatientAction, {
    formData: formData,
  } as PatientFormState);
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null); // Initialize as null
  const fetchPatientData = async (id: string) => {
    try {
      const res = await fetch(`/api/patient/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: Patient = await res.json();
      setPatient(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientData(patientId);
    }
  }, [patientId]);
  useEffect(() => {
    if (formState?.success) {
      router.refresh();
    }
  }, [formState.success, router]);
  console.log(formData.get("firstName")?.toString());
  return (
    <PatientFormDialog
      title={patientId ? "Näsagy üýtgetmek" : "Näsag goşmak"}
      description=""
      action={action}
      fields={
        <PatentFormFields
          doctorId={doctorId}
          {...formState}
          patient={patient}
        />
      }
      actions={actions}
      error={
        <ErrorMessage
          error={formState?.errors?._errors && formState?.errors?._errors[0]}
        />
      }
    />
  );
}
