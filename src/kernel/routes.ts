import { PatientId } from "./ids";

export const routes = {
  signIn: () => `/sign-in`,
  signUp: () => `/sign-up`,
  patient: (patientId: PatientId) => `/patient/${patientId}`,
  patientStream: (patientId: PatientId) => `/patient/${patientId}/stream`,
  patientsStream: () => `/patient`,
};
