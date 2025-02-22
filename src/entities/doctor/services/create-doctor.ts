import cuid from "cuid";
import { doctorRepository } from "../repositories/doctor";
import { passwordService } from "./password";
import { CreateDoctorSchema } from "../domain";

export const createDoctor = async ({
  doctorName,
  firstName,
  secondName,
  password,
}: CreateDoctorSchema) => {
  const doctorWithLogin = await doctorRepository.getDoctor({ doctorName });

  if (doctorWithLogin) {
    return doctorWithLogin;
  }

  if (!firstName || !secondName) {
    throw Error("have't first_name and second_name");
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const doctor = await doctorRepository.saveDoctor({
    id: cuid(),
    firstName,
    secondName,
    doctorName,
    passwordHash: hash,
    salt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return doctor;
};
