import { NextRequest } from "next/server";
// import { savePaymentToDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(body, "BODY");
  // Валідуй підпис (за бажанням)
  const { invoiceId, status, reference } = body;

  const [userId, lessonId] = reference.split("_");

  if (status === "success") {
    // await savePaymentToDB({ userId, lessonId, invoiceId });
  }

  return new Response("ok", { status: 200 });
}
