// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
//
// export const authOptions = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async signIn({ profile }: any): Promise<any> {
//       console.log(profile, "PROFILE");
//       // await connect(); // Підключення до бази даних
//
//       try {
//         // Шукаємо користувача за Google ID або email
//         // let user = await User.findOne({
//         //   $or: [{ googleId: profile.sub }, { googleEmail: profile.email }],
//         // });
//         //
//         // if (!user) {
//         //   // Якщо користувач не знайдений, створюємо нового
//         //   await User.create({
//         //     provider: "google",
//         //     googleId: profile.sub,
//         //     googleEmail: profile.email,
//         //     googleName: profile.name,
//         //     googleImage: profile.picture,
//         //   });
//         // } else {
//         //   // Якщо користувач знайдений, оновлюємо його дані
//         //   await User.updateOne(
//         //     { _id: user._id },
//         //     {
//         //       googleId: profile.sub,
//         //       googleEmail: profile.email,
//         //       googleName: profile.name,
//         //       googleImage: profile.picture,
//         //     },
//         //   );
//         // }
//
//         return true; // Дозволяємо вхід
//       } catch (error) {
//         console.error("Error signing in with Google:", error);
//         return false;
//       }
//     },
//   },
// });
