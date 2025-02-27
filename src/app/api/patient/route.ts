import prisma from "@/shared/lib/db";
import cuid from "cuid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const patientDataSchema = z.object({
  firstName: z.string().min(3),
  secondName: z.string().min(3),
  gender: z.enum(["M", "F"]),
  address: z.string(),
  diagnose: z.string(),
  nationality: z.string(),
  section: z.string(),
  birthday: z
    .string()
    .min(3)
    .transform((val) => new Date(val)),
  enterAt: z
    .string()
    .min(3)
    .transform((val) => new Date(val)),
  doctorId: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = patientDataSchema.parse(body);
    const patient = await prisma.patient.create({
      data: {
        id: cuid(),
        ...data,
      },
    });
    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
