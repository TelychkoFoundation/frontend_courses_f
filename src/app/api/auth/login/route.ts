import { NextResponse } from "next/server";
import { encrypt } from "@/lib";
import { User } from "@/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body, "BODY");
    const { id, first_name, last_name, username, photo_url, auth_date, hash } =
      body;

    if (!id) return new NextResponse("Missing user ID", { status: 400 });

    const now = new Date();

    await User.findOneAndUpdate(
      { id },
      {
        $setOnInsert: {
          first_name: first_name,
          last_name: last_name || "",
          username: username || null,
          photo_url: photo_url || null,
          auth_date: auth_date,
          hash: hash,
          xp: 0,
          level: 1,
          total_spent: 0,
          subscription: {
            active: false,
            auto_renew: false,
            started_at: null,
            ends_at: null,
          },
          purchased_lessons: [],
          purchased_courses: [],
          lesson_progress: [],
          reminders: [],
          reviews: [],
          referrals: [],
          my_courses: [],
        },
        $set: {
          lastLogin: now,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    console.log(id, expiresAt, "id, expiresAt");
    const token = await encrypt({ userID: id, expiresAt });

    const response = new NextResponse(JSON.stringify({ success: true }));
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
