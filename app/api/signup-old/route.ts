import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    // Check if all required are filled in
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required. ✖️" }, { status: 400 });
    }

    // Check if user exists already (check email as it's unique)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use. 📧" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return NextResponse.json({ message: "User created successfully! 😎", user })

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong! ☹️" }, { status: 500 })
  }
}