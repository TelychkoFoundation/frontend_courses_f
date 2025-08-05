import "server-only";

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { ISessionPayload } from "@/typings";
// import { cache } from "react";

export const SESSION_KEY = "session";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: ISessionPayload) {
  const payloadForJWT: JWTPayload = {
    ...payload,
    expiresAt: payload.expiresAt.toISOString(),
  };

  return new SignJWT(payloadForJWT)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session || session.split(".").length !== 3) {
    console.error("Invalid or missing token:", session);
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error, "Failed to verify session");
    return null;
  }
}

export const verifySession = async () => {
  const cookie = (await cookies()).get(SESSION_KEY)?.value;
  const session = await decrypt(cookie);

  if (!session?.userID) {
    return { isAuth: false };
  }

  return { isAuth: true, userID: session.userID };
};

export async function createSession(userID: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userID, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get(SESSION_KEY)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
