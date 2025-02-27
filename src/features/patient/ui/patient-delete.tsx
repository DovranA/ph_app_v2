"use client";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

const PatientDelete = ({ id }: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const deletePatient = async () => {
    setIsPending(true); // Set loading state

    try {
      const res = await fetch(`/api/patient/${id}`, { method: "DELETE" }); // Change to DELETE method
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // const data = await res.json();

      router.refresh();
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button" // Change to "button" so it doesn't submit a form
      disabled={isPending}
      onClick={deletePatient} // Call deletePatient on button click
      className="text-red-500 bg-transparent w-full hover:bg-red-500 hover:text-white rounded-lg"
    >
      {isPending ? "Deleting..." : "Delete Patient"} {/* Adjust button text */}
    </Button>
  );
};

export default PatientDelete;
