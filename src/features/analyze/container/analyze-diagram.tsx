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
const color = 4;
const colorArr = [
  "phdef",
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
    <div className="flex items-center gap-6 px-4">
      <div
        className={`aspect-[1/1] w-96 h-96 rounded-full flex items-center justify-center ${colorArr[color]}`}
      >
        <p className="text-9xl font-semibold">
          {analyzeData[analyzeData.length - 1].value}
        </p>
      </div>
      <div className="w-full ">
        <ChartAnalyze analyzeData={analyzeData} />
      </div>
    </div>
  );
};

export default AnalyzeDiagram;
