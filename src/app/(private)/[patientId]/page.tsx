import { analyzeListService } from "@/entities/analyze/server";
import { getCurrentPatient } from "@/entities/patient/server";
import { AnalyzeDiagram } from "@/features/analyze";

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

  // console.log(patientData);

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col justify-between">
      <div className="w-full flex p-6 text-lg gap-4">
        <DetailColumn
          first={patientData?.firstName ?? ""}
          second={patientData?.secondName ?? ""}
          firstkey="Ady"
          secondkey="Familiýasy"
        />
        <DetailColumn
          first={convertToDDMMYYYY(patientData?.birthday) ?? ""}
          second={patientData?.address ?? ""}
          firstkey="Doglan senesi"
          secondkey="Addresi"
        />
        <DetailColumn
          first={patientData?.medicalHistory ?? ""}
          second={patientData?.diagnose ?? ""}
          firstkey="Kesel taryhy"
          secondkey="Diagnosy"
        />
        <DetailColumn
          first={convertToDDMMYYYY(patientData?.enterAt) ?? ""}
          second={convertToDDMMYYYY(patientData?.createdAt)}
          firstkey="Giren wagty"
          secondkey="Ýazga alnan wagty"
        />
      </div>
      <PhBoxes />
      <AnalyzeDiagram {...analyzeData} />
    </div>
  );
}

const DetailColumn = ({
  first,
  second,
  firstkey,
  secondkey,
}: {
  firstkey?: string;
  secondkey?: string;
  first?: string;
  second?: string;
}) => {
  return (
    <div className="flex-1 bg-white py-2 px-4 rounded-lg">
      <div>
        {firstkey}: <span>{first}</span>
      </div>
      <div>
        {secondkey} : <span>{second}</span>
      </div>
    </div>
  );
};

const PhBoxes = () => {
  const phs = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirdteen",
    "fourteen",
  ];
  return (
    <div className="flex w-full h-14 gap-2 px-5">
      {phs.map((ph, index) => {
        return (
          <div
            key={index}
            className={`${ph}  h-14 flex-1 flex items-center justify-center rounded-lg`}
          >
            <p className="text-lg text-white font-semibold ">{index + 1}ph</p>
          </div>
        );
      })}
    </div>
  );
};
