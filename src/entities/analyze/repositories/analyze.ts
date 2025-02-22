import prisma from "@/shared/lib/db";
import { Analyze, Prisma } from "@prisma/client";

function createAnalyze(analyze: Analyze) {
  return prisma.analyze.upsert({
    where: { id: analyze.id },
    create: analyze,
    update: { ...analyze, createdAt: new Date() },
  });
}

function getAnalyze(where: Prisma.AnalyzeWhereInput) {
  return prisma.analyze.findFirst({
    where,
  });
}
async function getAnalyzeList(where: Prisma.AnalyzeWhereInput) {
  const [analyzes, total] = await Promise.all([
    prisma.analyze.findMany({
      where,
      take: 10,
      orderBy: { createdAt: "desc" },
    }),
    prisma.analyze.count({ where }),
  ]);

  return { analyzes, total };
}
export const analyzeRepository = { createAnalyze, getAnalyze, getAnalyzeList };
