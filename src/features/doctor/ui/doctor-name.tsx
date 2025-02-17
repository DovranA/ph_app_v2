import { doctorRepository } from "@/entities/doctor/repositories/doctor";
import { sessionService } from "@/entities/doctor/server";
import React from "react";

const DoctorName = async () => {
  const { session } = await sessionService.verifySession();
  const doctor = await doctorRepository.getDoctor({ id: session.id });
  return (
    <div className="text-lg">
      {doctor?.firstName} {doctor?.secondName}
    </div>
  );
};

export default DoctorName;
