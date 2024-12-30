import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const PUT = async (req: Request) => {
  try {
    const { name, password, email } = await req.json();
    console.log(name, password, email);

    if (!name || !password) {
      return NextResponse.json({ error: "Name and password are required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user info" }, { status: 500 });
  }
}