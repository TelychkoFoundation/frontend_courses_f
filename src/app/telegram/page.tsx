// app/auth/telegram/page.tsx
"use client"; // Це важливо!

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function TelegramAuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authData = {
      id: searchParams.get("id"),
      first_name: searchParams.get("first_name"),
      username: searchParams.get("username"),
      auth_date: searchParams.get("auth_date"),
      hash: searchParams.get("hash"),
      // ...інші параметри
    };

    console.log(authData, "AUTHDATA");

    if (authData.id && authData.hash) {
      // Відправте ці дані на ваш API-роут для верифікації
      fetch("/api/auth/verify-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, "DATA");
          if (data.success) {
            router.push("/courses");
          } else {
            // Обробка помилки
            console.error("Failed to verify Telegram data.");
            router.push("/");
          }
        })
        .catch(error => {
          console.error("Error during verification:", error);
          router.push("/");
        });
    } else {
      // Якщо дані відсутні, перенаправляємо на сторінку логіну
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div>
      <h1>Processing Telegram Login...</h1>
      <p>Please wait a moment.</p>
    </div>
  );
}
