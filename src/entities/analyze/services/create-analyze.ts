import cuid from "cuid";
import { CreateAnalyzeSchema } from "../domain";
import { analyzeRepository } from "../repositories/analyze";

export const createAnalyzeService = async (analyze: CreateAnalyzeSchema) => {
  try {
    const createdPatient = await analyzeRepository.createAnalyze({
      ...analyze,
      id: cuid(),
      createdAt: new Date(),
    });
    return createdPatient;
  } catch (error: any) {
    console.error(error);
    throw new Error("error create patient");
  }
};
