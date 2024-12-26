'use server'

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export const registerUser = async (formData: FormData) => {
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