import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_KEY } from "@/lib";
import { cookies } from "next/headers";

// Публічні маршрути
const publicRoutes = ["/login", "/tutorial", "/services"];

export default async function middleware(req: NextRequest) {
  // 1. Отримуємо шлях запиту
  const path = req.nextUrl.pathname;

  // 2. Перевіряємо, чи це публічний маршрут
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Розшифровуємо кукі для отримання сесії
  const cookie = (await cookies()).get(SESSION_KEY)?.value; // Отримати значення кукі
  const session = cookie ? await decrypt(cookie) : null; // Спробувати розшифрувати кукі для отримання сесії

  console.log("Request path:", path);
  console.log("Session cookie:", cookie);
  console.log("Session data:", session);

  // Для нового користувача (відсутній токен)
  if (!session && !isPublicRoute) {
    console.log("No session found. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. Якщо це не публічний маршрут і користувач неавторизований -> перенаправити на /login
  if (!isPublicRoute && !session?.userID) {
    console.log("Unauthorized, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Якщо це публічний маршрут, але користувач авторизований -> перенаправити до /courses
  if (isPublicRoute && session?.userID) {
    console.log("Authorized session detected, redirecting to /courses");
    return NextResponse.redirect(new URL("/courses", req.nextUrl));
  }

  // 6. Дозволити доступ до маршруту
  return NextResponse.next();
}
