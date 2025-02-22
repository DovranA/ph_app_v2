import prisma from "@/shared/lib/db";
import { Doctor, Prisma } from "@prisma/client";
import { DoctorSchema } from "../domain";

export function saveDoctor(
  doctor: Doctor
): Promise<DoctorSchema & { id: string }> {
  return prisma.doctor.upsert({
    where: {
      id: doctor.id,
    },
    create: doctor,
    update: doctor,
    omit: { passwordHash: true, salt: true },
  });
}
export function getDoctor(
  where: Prisma.DoctorWhereInput,
  omit?: Prisma.DoctorOmit
) {
  return prisma.doctor.findFirst({
    where,
    omit,
  });
}

export const doctorRepository = { getDoctor, saveDoctor };
