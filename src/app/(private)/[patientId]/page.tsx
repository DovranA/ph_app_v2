import { analyzeListService } from "@/entities/analyze/server";
import { getCurrentPatient } from "@/entities/patient/server";
import { AnalyzeDiagram } from "@/features/analyze";

export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const patientId = (await params).patientId;
  const patientData = await getCurrentPatient(patientId);
  const analyzeData = await analyzeListService({ patientId });
  return (
    <div>
      <AnalyzeDiagram {...analyzeData} />
    </div>
  );
}
