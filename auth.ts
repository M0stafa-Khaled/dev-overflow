import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOLGE_ID,
      clientSecret: process.env.AUTH_GOOLGE_SECRET,
    }),
    Credentials({
      credentials: {},
      authorize: (credentioals) => {
        return null;
      },
    }),
  ],
});
