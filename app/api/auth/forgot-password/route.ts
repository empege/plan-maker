import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({
      message: "If this email is registered, you will receive a reset link. (you will not, user doesn't exist you cheater! :D)",
    });
  }

  const tempPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  const transporter = nodemailer.createTransport<SMTPTransport.Options>({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // True samo za port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `Your temporary password is: ${tempPassword}. Please log in and change it immediately.`,
  });

  console.log('POSLATO!')
  console.log('from: ', process.env.EMAIL_USER)
  console.log('to: ', email)

  return NextResponse.json({
    message: "Success! If this email is registered, you will receive a reset link.",
  });
}
