import { useActionState } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Analyze, Patient } from "@prisma/client";
import { format } from "date-fns/format";
import React, {
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import {
  editPatientAction,
  PatientFormState,
} from "../../actions/edit-pateint";

type Props = {
  id: string;
};
interface PatientData extends Patient {
  analyze: Analyze[];
}
const PrintDialog = ({ id }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [patient, setPatient] = useState<PatientData | null>(null); // Initialize as null
  const fetchPatientData = async (id: string) => {
    try {
      const res = await fetch(`/api/patient/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: PatientData = await res.json();
      setPatient(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  useEffect(() => {
    fetchPatientData(id);
  }, [id]);

  return (
    <DialogContent className="sm:max-w-[725px]">
      <DialogTitle>Nasagyň maglumatlary</DialogTitle>
      <DialogDescription>
        Aşakda näsagyň lukmançylyk resminamasy görkezilýär. Döretmek üçin
        &quot;Çap&quot; düwmesine basyň.
      </DialogDescription>
      {/* Printable Content */}
      <div ref={printRef} className="p-4 border rounded-md bg-white">
        <h2 className="text-xl font-bold text-center mb-4">
          Näsaglaryň lukmançylyk hasabaty
        </h2>
        <div className="space-y-2">
          <p>
            <strong>FAA:</strong>
            {patient?.firstName + " " + patient?.secondName}
          </p>
          <p>
            <strong>Birthday:</strong>
            {patient?.birthday
              ? format(patient.birthday, "dd.MM.yyyy HH:mm:ss")
              : "no data"}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {patient?.gender === "M" ? "Male" : "Female"}
          </p>
          <p>
            <strong>Address:</strong> {patient?.address}
          </p>
          <p>
            <strong>Medical History:</strong> {patient?.medicalHistory}
          </p>
          <p>
            <strong>Diagnosis:</strong> {patient?.diagnose}
          </p>
          <p>
            <strong>Admitted At:</strong>
            {patient?.enterAt
              ? format(patient?.enterAt, "dd.MM.yyyy HH:mm:ss")
              : "no date"}
          </p>

          <h3 className="font-semibold mt-4">Analyze Results</h3>
          <ul className="list-disc pl-5">
            {patient?.analyze?.map((analyze) => (
              <li key={analyze.id}>
                <strong>Value:</strong> {analyze.value} |{" "}
                <strong>
                  Date:
                  {analyze?.createdAt
                    ? format(analyze.createdAt, "dd.MM.yyyy HH:mm:ss")
                    : "no date"}
                </strong>
                {/* {analyze.createdAt} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={() => handlePrint()}>
          Çap
        </Button>
      </div>
    </DialogContent>
  );
};

export default PrintDialog;
