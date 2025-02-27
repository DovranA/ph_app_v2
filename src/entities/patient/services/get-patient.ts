import { patientRepository } from "../repositories/patient";

export const getPatient = async (patientId: string) => {
  const patient = await patientRepository.getPatient(
    { id: patientId },
    { analyze: { orderBy: { createdAt: "desc" }, take: 10 } }
  );

  return patient;
};
