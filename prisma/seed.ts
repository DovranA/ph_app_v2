import { PrismaClient } from "@prisma/client";
import cuid from "cuid";

const prisma = new PrismaClient();

async function main() {
  // const doctorId = cuid();
  // await prisma.doctor.create({
  //   data: {
  //     id: doctorId,
  //     firstName: "Kerimberdi",
  //     secondName: "Hajymammedow",
  //     doctorName: "kerimberdi_hajymammedow",
  //     passwordHash:
  //       "88745eb3436937ef244e8863eab7045e2ce9db814288793382c76a92d754907d417519bf4f256ef02cc5af5781cc1e1abbf2f1c1a2bdcbb7a3449d4b5cad9217",
  //     salt: "a520a9dd76fa2c390ced07bd44102b44",
  //   },
  // });
  await prisma.patient.create({
    data: {
      address: "Lebap",
      birthday: new Date(),
      gender: "M",
      doctorId: "cm751qj310000wcvag6587iji",
      testMaterial: "test material3",
      medicalHistory: "history4",
      diagnose: "dignozzzzzy 6",
      id: cuid(),
      firstName: "planyy",
      secondName: "Palnyye",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
