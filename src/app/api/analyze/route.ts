import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { z } from "zod";
let latestMessage: number | null = null;
const schema = z.object({
  value: z.number({ message: "need number" }),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    latestMessage = data.value;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { response, write, close, addCloseListener } = sseStream(req);

  write({ message: latestMessage });

  const interval = setInterval(() => {
    write({ message: latestMessage });
  }, 1000);

  addCloseListener(() => {
    clearInterval(interval);
    close();
  });

  return response;
}
