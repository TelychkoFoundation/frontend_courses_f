import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_KEY } from "@/lib";

export async function middleware(req: NextRequest) {
  const publicRoutes = ["/", "/auth/telegram"];
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get(SESSION_KEY)?.value;
  const session = sessionToken ? await decrypt(sessionToken) : null;

  if (!session?.userID) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
