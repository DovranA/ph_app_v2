import { Doctor } from "@prisma/client";

export type CreateDoctorSchema = {
  firstName?: string;
  secondName?: string;
  doctorName: string;
  password: string;
};
export type DoctorEntity = {
  id: string;
  doctorName: string;
};
export type SessionEntity = {
  id: string;
  doctorName: string;
  expiredAt: string;
};
export const userToSession = (
  user: DoctorEntity,
  expiredAt: string
): SessionEntity => {
  return {
    id: user.id,
    doctorName: user.doctorName,
    expiredAt,
  };
};
export const DoctorWithoutPassword = { passwordHash: true, salt: true };
export type DoctorSchema = Omit<Doctor, "id" | "passwordHash" | "salt">;
