import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        if (!user.verified) {
          throw new Error("Account not verified. Please check your email.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          verified: user.verified,
        };
      },
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.verified = token.verified;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }