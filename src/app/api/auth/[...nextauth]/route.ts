// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { connect } from "@/lib/db"; // Замініть на ваш шлях до підключення до бази даних
// import User from "@/src/models/User"; // Замініть на ваш шлях до моделі

// const CLIENT_ID =
//   "45378919660-mg0npd2t5u5re76f6qjg5hj4782cn0n1.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";

export const authOptions = {
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID as string,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      clientId:
        "45378919660-mg0npd2t5u5re76f6qjg5hj4782cn0n1.apps.googleusercontent.com",
      clientSecret: "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",
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

export { handler as GET, handler as POST };
