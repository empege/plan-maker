'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import bcrypt from "bcryptjs"
import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server";

export const registerUser = async (formData: FormData) => {

  console.log('formData: ', formData)
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  console.log(name, email, password)

  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error("Email is already in use.")
  } else {
    console.log('ADDED!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  redirect("/login")
}

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("All fields are required.");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User doesn't exist, signup please.");
  }
  console.log(user)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Not needed
  console.log({ id: user.id, name: user.name, email: user.email });
  //
  const response = NextResponse.redirect("https://localhost:3000");
  response.cookies.set({
    name: "user",
    value: JSON.stringify({ id: user.id, name: user.name, email: user.email }),
    httpOnly: true,
    path: "/",
  });

  redirect("/");
}