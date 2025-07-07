// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { checkTelegramAuth } from "../../lib/auth";

export async function POST(req: Request) {
  const data = await req.json();

  console.log(data, "data");

  if (!checkTelegramAuth(data)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  console.log("next");

  const response = NextResponse.json({ ok: true });
  response.cookies.set("auth_token", data.hash, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 тиждень
  });

  return response;
}
