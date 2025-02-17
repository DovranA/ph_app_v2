import { patientRepository } from "../repositories/patient";

export const patientListService = async ({
  doctorId,
  limit,
  page,
  search,
}: {
  doctorId: string;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const skip = page ? (page - 1) * (limit ? limit : 10) : 0;
    return patientRepository.getPatientList(
      {
        doctorId,
        OR: search
          ? [
              {
                firstName: {
                  contains: search,
                },
              },
              {
                secondName: {
                  contains: search,
                },
              },
            ]
          : undefined,
      },
      skip,
      limit ? limit : 10
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};
