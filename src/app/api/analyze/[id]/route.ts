import { analyzeRepository } from "@/entities/analyze/repositories/analyze";
import { createAnalyzeService } from "@/entities/analyze/server";
import cuid from "cuid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  value: z.number({ message: "need number" }),
});
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const patientId = (await params).id;
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const analyze = await createAnalyzeService({
      id: cuid(),
      value: data.value,
      patientId,
    });
    return new Response(JSON.stringify(analyze), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
