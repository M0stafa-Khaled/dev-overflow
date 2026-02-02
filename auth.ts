import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { api } from "./lib/api";
import { IAccountDoc } from "./database/account.model";
import { SignInSchema } from "./lib/validations";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const { data: existsAccount } = (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>;

          if (!existsAccount) return null;

          const { data: existsUser } = await api.users.getById(
            existsAccount.userId.toString()
          );

          if (!existsUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existsAccount.password!
          );
          if (isValidPassword)
            return {
              id: existsUser._id.toString(),
              name: existsUser.name,
              email: existsUser.email,
              image: existsUser.image,
            };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existsAccount, success } =
          (await api.accounts.getByProvider(
            account?.type === "credentials"
              ? token.email!
              : (account?.providerAccountId as string)
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existsAccount) return token;

        const userId = existsAccount.userId;
        if (userId) token.sub = userId.toString();
      }
      return token;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "google" | "github",
        providerAccountId: account.providerAccountId as string,
      })) as ActionResponse;

      if (!success) return false;
      return true;
    },
  },
});
