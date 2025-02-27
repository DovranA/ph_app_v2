import prisma from "@/shared/lib/db";
import { Patient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

function createPatients(patient: Patient) {
  return prisma.patient.upsert({
    where: { id: patient.id },
    create: patient,
    update: { ...patient, updatedAt: new Date() },
    omit: { doctorId: true },
  });
}
function updatePatient(patient: Partial<Patient>) {
  return prisma.patient.update({
    data: { ...patient },
    where: { id: patient.id },
  });
}
function deletePatient(id: string) {
  return prisma.patient.delete({ where: { id } });
}

function getPatient(
  where: Prisma.PatientWhereInput,
  include?: Prisma.PatientInclude<DefaultArgs>
) {
  return prisma.patient.findFirst({
    where,
    include,
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
export const patientRepository = {
  createPatients,
  getPatient,
  getPatientList,
  deletePatient,
  updatePatient,
};
