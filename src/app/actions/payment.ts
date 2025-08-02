"use server";

import { redirect } from "next/navigation";

export async function createPayment(userId: number, lessonId: string) {
  const monobankUrl = "https://api.monobank.ua/api/merchant/invoice/create";
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/monobank/callback`;

  const res = await fetch(monobankUrl, {
    method: "POST",
    headers: {
      "X-Token": process.env.MONOBANK_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 10000, // копійки (100.00 грн)
      ccy: 980,
      redirectUrl: callbackUrl,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/monobank/webhook`,
      merchantPaymInfo: {
        reference: `${userId}_${lessonId}`,
        destination: `Оплата за урок #${lessonId}`,
      },
    }),
  });

  console.log(res, "RES");

  const data = await res.json();

  console.log(data, "DATA");

  if (!res.ok) throw new Error("Не вдалося створити платіж");

  // Редірект на оплату
  redirect(data.pageUrl);
}
