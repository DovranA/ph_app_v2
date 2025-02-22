import { Analyze } from "@prisma/client";

export type CreateAnalyzeSchema = Omit<Analyze, "createdAt">;
