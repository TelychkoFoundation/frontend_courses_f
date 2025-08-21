// import { authOptions } from "../../../auth";
// export const { GET, POST } = authOptions;

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }: any): Promise<any> {
      console.log(profile, "PROFILE");

      try {
        return true; // Дозволяємо вхід
      } catch (error) {
        console.error("Error signing in with Google:", error);
        return false;
      }
    },
  },
});

// 1. Створюємо обробник (handler) з налаштувань
const handler = NextAuth(authOptions);

// 2. Явно експортуємо функції-обробники GET та POST для App Router
export { handler as GET, handler as POST };
