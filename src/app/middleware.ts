import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const publicRoutes = ["/"];
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
