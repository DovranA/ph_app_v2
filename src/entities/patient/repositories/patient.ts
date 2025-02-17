import prisma from "@/shared/lib/db";
import { Patient, Prisma } from "@prisma/client";

function createPatients(patient: Patient) {
  return prisma.patient.upsert({
    where: { id: patient.id },
    create: patient,
    update: { ...patient, updatedAt: new Date() },
    omit: { doctorId: true },
  });
}

function getPatient(where: Prisma.PatientWhereInput) {
  return prisma.patient.findFirst({
    where,
  });
}
async function getPatientList(
  where: Prisma.PatientWhereInput,
  skip?: number,
  take?: number
) {
  const [patients, total] = await Promise.all([
    prisma.patient.findMany({ where, skip, take }),
    prisma.patient.count({ where }),
  ]);

  return { patients, total };
}
export const patientRepository = { createPatients, getPatient, getPatientList };
