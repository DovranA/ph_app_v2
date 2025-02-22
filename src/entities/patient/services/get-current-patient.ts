import { patientRepository } from "../repositories/patient";

export const getCurrentPatient = (patientId: string) => {
  return patientRepository.getPatient({ id: patientId });
};
