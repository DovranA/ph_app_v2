"use client";
import { Button } from "@/shared/ui/button";
import {
  deletePatientAction,
  PatientDeleteFormState,
} from "../actions/delete-patient";
import { useActionState } from "@/shared/lib/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type Props = {
  id: string;
};
const PatientDelete = ({ id }: Props) => {
  const [formState, action, isPending] = useActionState(
    deletePatientAction,
    {} as PatientDeleteFormState
  );
  const router = useRouter();
  useEffect(() => {
    if (formState?.success) {
      router.refresh();
    }
  }, [formState?.success, router]);
  return (
    <form className="w-full" action={action}>
      <input type="hidden" name="id" id="id" value={id} />
      <Button
        type="submit"
        disabled={isPending}
        onClick={() => router.refresh()}
        className="text-red-500 bg-transparent w-full hover:bg-red-500 hover:text-white rounded-lg"
      >
        Pozmak
      </Button>
    </form>
  );
};

export default PatientDelete;
