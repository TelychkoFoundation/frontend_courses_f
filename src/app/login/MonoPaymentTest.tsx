"use client";

import { useTransition } from "react";
import { createPayment } from "@/actions";

export default function MonoPaymentTest() {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            createPayment(388906921, "688d2fdaaeae2cf6c2464bc2"),
          )
        }
      >
        {isPending ? "Очікуємо..." : "Купити урок"}
      </button>
    </div>
  );
}
