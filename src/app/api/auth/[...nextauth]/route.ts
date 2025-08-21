// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
// import { connect } from "@/lib/db"; // Замініть на ваш шлях до підключення до бази даних
// import User from "@/src/models/User"; // Замініть на ваш шлях до моделі

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }: any) {
      console.log(profile, "PROFILE");
      // await connect(); // Підключення до бази даних

      try {
        // Шукаємо користувача за Google ID або email
        // let user = await User.findOne({
        //   $or: [{ googleId: profile.sub }, { googleEmail: profile.email }],
        // });
        //
        // if (!user) {
        //   // Якщо користувач не знайдений, створюємо нового
        //   await User.create({
        //     provider: "google",
        //     googleId: profile.sub,
        //     googleEmail: profile.email,
        //     googleName: profile.name,
        //     googleImage: profile.picture,
        //   });
        // } else {
        //   // Якщо користувач знайдений, оновлюємо його дані
        //   await User.updateOne(
        //     { _id: user._id },
        //     {
        //       googleId: profile.sub,
        //       googleEmail: profile.email,
        //       googleName: profile.name,
        //       googleImage: profile.picture,
        //     },
        //   );
        // }

        return true; // Дозволяємо вхід
      } catch (error) {
        console.error("Error signing in with Google:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

// 🚀 Виправлений код: додані типи до параметрів
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res);
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res);
}
