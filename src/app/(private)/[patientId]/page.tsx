import { analyzeListService } from "@/entities/analyze/server";
import { getCurrentPatient } from "@/entities/patient/server";
import { AnalyzeDiagram } from "@/features/analyze";
import { Button } from "@/shared/ui/button";
import { Play } from "lucide-react";
function convertToDDMMYYYY(dateString: Date | undefined) {
  const date = new Date(dateString ?? "");

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const patientId = (await params).patientId;
  const patientData = await getCurrentPatient(patientId);
  const analyzeData = await analyzeListService({ patientId });

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col justify-between">
      <div className="w-full flex p-6 text-lg">
        <div className="flex-1">
          <div>
            Ady: <span>{patientData?.firstName}</span>
          </div>
          <div>
            Familyasy: <span>{patientData?.secondName}</span>
          </div>
          <div>
            Doglan yyly: <span>{convertToDDMMYYYY(patientData?.birthday)}</span>
          </div>
        </div>
        <div className="flex-1">
          <div>
            Diagnose: <span>{patientData?.diagnose}</span>
          </div>
          <div>
            Giren wagty: <span>{convertToDDMMYYYY(patientData?.enterAt)}</span>
          </div>
          <div>
            Jynsy: <span>{patientData?.gender === "M" ? "Erkek" : "Ayal"}</span>
          </div>
        </div>
        <div className="flex-1">
          <div>
            Kesel taryhy: <span>{patientData?.medicalHistory}</span>
          </div>
          <div>
            Test material : <span>{patientData?.testMaterial}</span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button>
            <Play />
          </Button>
        </div>
      </div>

      <AnalyzeDiagram {...analyzeData} />
    </div>
  );
}
