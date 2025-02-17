import { DoctorWithoutPassword } from "../domain";
import { doctorRepository } from "../repositories/doctor";
import { sessionService } from "./session";

export const getCurrentDoctor = async (
  getCookies?: () => Promise<string | undefined>
) => {
  const { session } = await sessionService.verifySession(getCookies);
  return doctorRepository.getDoctor({ id: session.id }, DoctorWithoutPassword);
};
