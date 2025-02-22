import { DoctorEntity } from "../domain";
import { doctorRepository } from "../repositories/doctor";
import { passwordService } from "./password";

export async function verifyDoctorPassword({
  doctorName,
  password,
}: {
  doctorName: string;
  password: string;
}) {
  const doctor = await doctorRepository.getDoctor({ doctorName });
  if (!doctor) {
    throw new Error("Cannot find doctor with the provided name");
  }

  const isCompare = await passwordService.comparePasswords({
    hash: doctor.passwordHash,
    salt: doctor.salt,
    password,
  });
  if (isCompare) {
    const verifiedDoctor: DoctorEntity = {
      id: doctor.id,
      doctorName: doctor.doctorName,
    };
    return verifiedDoctor;
  }
  throw new Error("Doctor password is incorrect");
}
