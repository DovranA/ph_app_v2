"use client";
import { useEventsSource } from "@/shared/lib/sse/client";
import { Analyze } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChartAnalyze from "../ui/chart-analyze";
type Props = {
  analyzes: Analyze[];
  total: number;
};
const AnalyzeDiagram = ({ analyzes }: Props) => {
  const { patientId } = useParams<{ patientId: string }>();
  const { dataStream } = useEventsSource<{ message: number | string }>(
    "/api/analyze"
  );
  const [analyzeData, setAnalyzeData] = useState<Analyze[]>(analyzes);
  useEffect(() => {
    if (
      typeof dataStream?.message === "number" &&
      dataStream?.message !== analyzeData[analyzeData.length - 1].value
    )
      fetch(`/api/analyze/${patientId}`, {
        method: "POST",
        body: JSON.stringify({ value: dataStream?.message }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnalyzeData((prev) => {
            const updatedData = [...prev];
            updatedData.splice(0, 1);
            updatedData.push(data);
            return updatedData;
          });
        });
  }, [dataStream?.message]);
  return (
    <div className="w-full  border border-red-500">
      <ChartAnalyze analyzeData={analyzeData} />
    </div>
  );
};

export default AnalyzeDiagram;
