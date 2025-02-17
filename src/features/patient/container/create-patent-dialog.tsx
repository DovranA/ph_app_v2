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
import { useEffect } from "react";
type Props = { doctorId: string };
export function CreatePatentForm({ doctorId }: Props) {
  const [formState, action, isPending] = useActionState(
    createPatientAction,
    {} as PatientFormState
  );
  const router = useRouter();
  useEffect(() => {
    if (formState?.success) {
      router.refresh();
    }
  }, [formState.success]);

  return (
    <PatientFormDialog
      title="Create Patient"
      description=""
      action={action}
      fields={<PatentFormFields doctorId={doctorId} {...formState} />}
      actions={<SubmitButton isPending={isPending}>Create</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
    />
  );
}
