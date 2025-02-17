import { sessionService } from "@/entities/doctor/server";
import { CreatePatientSchema } from "../domain";
import { patientRepository } from "../repositories/patient";
import cuid from "cuid";

export const createPatientService = async (patient: CreatePatientSchema) => {
  try {
    const createdPatient = await patientRepository.createPatients({
      ...patient,
      id: cuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdPatient;
  } catch (error) {
    throw new Error("error create patient");
  }
};
