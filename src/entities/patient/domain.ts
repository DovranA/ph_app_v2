import { Patient } from "@prisma/client";

export type CreatePatientSchema = Omit<Patient, "createdAt" | "updatedAt">;
