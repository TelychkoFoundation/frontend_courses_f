"use server";

import { redirect } from "next/navigation";
import {
  ICourse,
  ICreateLinkPayload,
  ICreateLinkPayloadResponseData,
  ILesson,
} from "@/typings";

export async function createPaymentLink(payload: ICreateLinkPayload) {
  const res: Response = await fetch(
    "https://api.monobank.ua/api/merchant/invoice/create",
    {
      method: "POST",
      headers: {
        "X-Token": process.env.MONOBANK_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  console.log("response", res);
  console.log("payload", payload);

  const data: ICreateLinkPayloadResponseData = await res.json();

  console.log("data", data);

  if (!res.ok) throw new Error("Не вдалося створити платіж");
  return data.pageUrl;
}

export async function createPaymentForLesson(
  id: string,
  lesson: ILesson,
  redirectUrl: string,
) {
  const payload: ICreateLinkPayload = {
    amount: lesson.price as number,
    ccy: 980,
    redirectUrl,
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/monobank/webhook`,
    merchantPaymInfo: {
      reference: `${id}_${lesson.course_id}_${lesson._id}`,
      destination: `Оплата за урок - ${lesson.title}`,
    },
  };

  const paymentUrl: string = await createPaymentLink(payload);
  redirect(paymentUrl);
}

export async function createPaymentForCourse(
  id: string,
  course: ICourse,
  redirectUrl: string,
) {
  const payload: ICreateLinkPayload = {
    amount: course.price,
    ccy: 980,
    redirectUrl,
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/monobank/webhook`,
    merchantPaymInfo: {
      reference: `${id}_${course._id}_full`,
      destination: `Оплата за курс - ${course.title}`,
    },
  };

  const paymentUrl: string = await createPaymentLink(payload);
  redirect(paymentUrl);
}
