import { NextRequest } from "next/server";
import {
  ILesson,
  IPurchasedLesson,
  IPurchasedCourse,
  MonobankWebhookPayload,
} from "@/typings";
import { Types } from "mongoose";
import { User, Lesson } from "@/models";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // замість req.json()
  console.log("Raw body from Monobank:", rawBody);

  const body: MonobankWebhookPayload = JSON.parse(rawBody);
  // const body: MonobankWebhookPayload = await req.json();

  const { invoiceId, status, reference } = body;

  if (!reference) {
    console.log("reference", reference);
    return new Response("Missing reference", { status: 400 });
  }

  const [userID, courseID, lessonID] = reference.split("_");

  if (!Types.ObjectId.isValid(userID) || !Types.ObjectId.isValid(courseID)) {
    console.log("ERROR");
    return new Response("Invalid IDs in reference", { status: 400 });
  }

  if (status === "success") {
    try {
      const user = await User.findOne({ _id: userID });

      console.log(user, "USER");

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
          course: courseID,
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
