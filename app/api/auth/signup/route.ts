import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/lib/verificationEmail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);
    const hashedToken = await bcrypt.hash(rawToken, 10);

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        token: hashedToken,
        tokenExpires,
      },
    });

    await sendVerificationEmail(email, rawToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
