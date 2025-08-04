"use client";

import { useTransition } from "react";
import { createPaymentForLesson, createPaymentForCourse } from "@/actions";

export default function MonoPaymentTest() {
  const [isPending, startTransition] = useTransition();

  const lesson = {
    _id: "",
    course_id: "68781a6a661bfe59f4d16517",
    order: 0,
    title: "Що таке HTML",
    description:
      "Що таке HTMLЩо таке HTMLЩо таке HTMLЩо таке HTMLЩо таке HTMLЩо таке HTML",
    video_key: "HTML5Basics/scho-take-html/hooks.mp4",
    is_free: false,
    price: 0,
    transcript_url:
      "HTML5Basics/scho-take-html/298-Текст статті-285-1-10-20220329.pdf",
    presentation_url: "",
    xp_reward: 12,
    tags: [],
    views: 0,
    difficulty: "beginner",
    related_lessons: [],
    reviews: [],
    createdAt: "2025-08-01T21:21:30.625Z",
    updatedAt: "2025-08-01T21:21:30.625Z",
  };

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            createPaymentForLesson(
              lesson,
              "https://frontend-courses-f-77uc.vercel.app/courses",
            ),
          )
        }
      >
        {isPending ? "Очікуємо..." : "Купити урок"}
      </button>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            createPaymentForCourse(
              {
                _id: "68781a6a661bfe59f4d16517",
                title: "Основи HTML5",
                courseKey: "HTML5Basics",
                short_description:
                  "Розпочни свій шлях у веб-розробці - дізнайся, як створюються сайти з нуля",
                description:
                  "Цей курс - ідеальний старт для тих, хто ніколи не працював з HTML. Ми розберемо, що таке структура веб-сторінки, як працюють теги, атрибути, посилання, зображення та форми. Після завершення ти зможеш самостійно створювати прості, але грамотно побудовані сайти.",
                categories: {
                  base: ["web-dev", "frontend", "html"],
                  levelTopics: [],
                  practical: [],
                  professional: [],
                  audience: [],
                  tags: [],
                },
                prerequisites:
                  "Бажання вчитися та базове володіння комп’ютером.",
                outcomes:
                  "Вміння створювати структуру сайту, працювати з основними тегами HTML, формувати контент і посилання.",
                lessons: [
                  {
                    $oid: "688d2fdaaeae2cf6c2464bc2",
                  },
                  {
                    $oid: "688d2ff7aeae2cf6c2464bc7",
                  },
                  {
                    $oid: "688d3008aeae2cf6c2464bcc",
                  },
                  {
                    $oid: "688d301caeae2cf6c2464bd1",
                  },
                  {
                    $oid: "688d302faeae2cf6c2464bd6",
                  },
                ],
                price: 24234,
                is_free: true,
                is_published: true,
                difficulty: "Beginner",
                user_statuses: [],
                createdAt: {
                  $date: "2025-07-16T21:32:26.069Z",
                },
                updatedAt: {
                  $date: "2025-08-01T21:22:55.075Z",
                },
                __v: 0,
              },
              "https://frontend-courses-f-77uc.vercel.app/courses",
            ),
          )
        }
      >
        {isPending ? "Очікуємо..." : "Купити курс"}
      </button>
    </div>
  );
}
