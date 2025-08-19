import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const authData = await req.json();

  const { hash, ...data } = authData;

  // Сортуємо дані та формуємо рядок для перевірки
  const dataCheckString = Object.keys(data)
    .filter(key => key !== "hash")
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join("\n");

  const secretKey = crypto
    .createHash("sha256")
    .update('8003632730:AAE_TQv08t4SgwcVR4VFhJotn6RXE8WZ0Gk')
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (calculatedHash === hash) {
    return NextResponse.json({ success: true });
  } else {
=    return NextResponse.json(
      { success: false, error: "Invalid hash" },
      { status: 403 },
    );
  }
}
