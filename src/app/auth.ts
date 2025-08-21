import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { saveUser } from "@/actions";
import { IGoogleUserData } from "@/typings";

export const { handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }: any) {
      if (profile) {
        token.id = profile.sub;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ profile }): Promise<boolean> {
      if (!profile) {
        return false;
      }

      const userData: IGoogleUserData = {
        provider: "google",
        email: profile.email,
        id: profile.sub,
        name: profile.name,
        image: profile.picture,
        emailVerified: profile.email_verified,
      };

      try {
        await saveUser(userData);
        return true;
      } catch (error) {
        console.error("Error signing in with Google:", error);
        return false;
      }
    },
  },
});
