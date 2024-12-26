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

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    })
  ],
  session: {
    // By default this is the case, no need to add it, but not wrong to see it here :P
    strategy: "jwt", // Možeš koristiti i "database" strategiju ako koristiš sessions u bazi
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }