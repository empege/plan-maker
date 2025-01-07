import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const user = await prisma.user.findFirst({
    where: { token: { not: null }, tokenExpires: { gte: new Date() } },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token - !user" }, { status: 400 });
  }

  if (user.verified) {
    return NextResponse.json({
      message: "Account is already verified. Redirecting to login page...",
    });
  }

  if (!user.token || !(await bcrypt.compare(token, user.token))) {
    return NextResponse.json({ error: "Invalid or expired token - !user.token || bcrypt compare" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, token: null, tokenExpires: null },
  });

  return NextResponse.json({ message: "Account verified successfully, redirecting you to login page in 5 seconds..." });
}
