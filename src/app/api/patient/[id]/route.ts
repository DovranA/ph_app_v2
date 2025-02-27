import { getPatient } from "@/entities/patient/server";
import prisma from "@/shared/lib/db";
import cuid from "cuid";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const patientId = (await params).id;
  try {
    const patient = await getPatient(patientId);
    if (!patient) {
      return NextResponse.json({ error: "Пациент не найден" }, { status: 404 });
    }
    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

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
});
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const patientId = (await params).id;
  try {
    const body = await req.json();
    const data = patientDataSchema.parse(body);
    const patient = await prisma.patient.update({
      where: { id: patientId },
      data: {
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const patientId = (await params).id;
  try {
    const patient = await prisma.patient.delete({
      where: { id: patientId },
    });
    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
