'use server'

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const registerUser = async (formData: FormData) => {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error("Email is already in use.")
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