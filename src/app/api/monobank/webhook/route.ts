import { NextRequest, NextResponse } from "next/server";
import {
  ILesson,
  IPurchasedLesson,
  IPurchasedCourse,
  MonobankWebhookPayload,
} from "@/typings";
import { Types } from "mongoose";
import { User, Lesson } from "@/models";
import { createDBConnection } from "@/lib";

export const runtime = "nodejs";
await createDBConnection();

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const body: MonobankWebhookPayload = JSON.parse(rawBody);

  const { invoiceId, status, reference } = body;

  console.log(invoiceId, status, reference, "bbbbbb");

  if (!reference) {
    return new Response("Missing reference", { status: 400 });
  }

  const [id, courseID, lessonID] = reference.split("_");

  if (status === "success") {
    try {
      const user = await User.findOne({ id });

      if (!user) return new Response("User not found", { status: 404 });

      // --- Покупка ВСЬОГО курсу ---
      if (lessonID === "full") {
        const alreadyHasCourse: boolean = user.purchased_courses?.some(
          ({ course_id }: IPurchasedCourse): boolean =>
            course_id.toString() === courseID,
        );

        if (!alreadyHasCourse) {
          user.purchased_courses.push({
            course_id: new Types.ObjectId(courseID),
            purchased_at: new Date(),
          });
        }

        const courseLessons: ILesson[] = await Lesson.find({
          course_id: courseID,
        });

        for (const lesson of courseLessons) {
          const alreadyPurchased: boolean = user.purchased_lessons?.some(
            ({ lesson_id }: IPurchasedLesson): boolean =>
              lesson_id.toString() === lesson._id.toString(),
          );

          if (!alreadyPurchased) {
            user.purchased_lessons.push({
              lesson_id: lesson._id,
              course_id: new Types.ObjectId(courseID),
              invoice_id: invoiceId,
              purchased_at: new Date(),
            });

            if (lesson.price) {
              user.total_spent += lesson.price;
            }
          }
        }

        // const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        //
        // await User.updateOne(
        //   { id },
        //   {
        //     $set: {
        //       "mentorship.expiresAt": expiresAt,
        //       "mentorship.questionsLeft": 30,
        //     },
        //   },
        // );

        await user.save();
        return new Response("Course purchased successfully", { status: 200 });
      }

      // --- Покупка ОДНОГО уроку ---
      const alreadyPurchased: boolean = user.purchased_lessons?.some(
        ({ lesson_id }: IPurchasedLesson): boolean =>
          lesson_id.toString() === lessonID,
      );

      console.log(alreadyPurchased, "alreadyPurchased");

      if (!alreadyPurchased) {
        user.purchased_lessons.push({
          lesson_id: new Types.ObjectId(lessonID),
          course_id: new Types.ObjectId(courseID),
          invoice_id: invoiceId,
          purchased_at: new Date(),
        });

        const lesson: ILesson | null = await Lesson.findById(lessonID);
        if (lesson?.price) {
          user.total_spent += lesson.price;
        }

        // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        //
        // await User.updateOne(
        //   { id: Number(userID) },
        //   {
        //     $set: {
        //       "mentorship.expiresAt": expiresAt,
        //       "mentorship.questionsLeft": 2,
        //     },
        //   },
        // );

        console.log(user, "user");
        await user.save();
      }

      return new Response("Lesson purchase recorded", { status: 200 });
    } catch (error) {
      console.error("Webhook processing error:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}
