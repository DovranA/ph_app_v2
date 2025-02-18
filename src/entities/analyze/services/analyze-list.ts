import { analyzeRepository } from "../repositories/analyze";

export const analyzeListService = async ({
  patientId,
}: {
  patientId: string;
}) => {
  try {
    return analyzeRepository.getAnalyzeList({ patientId });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
