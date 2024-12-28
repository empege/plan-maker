'use server'

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";

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

export const createProject = async (formData: FormData) => {
  const name = formData.get('name')
  const description = formData.get('description')

  if (typeof name !== "string" || typeof description !== "string") {
    throw new Error("Invalid form data.");
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user found.");
  }

  await prisma.project.create({
    data: {
      name,
      description,
      userId: session.user.id
    },
  })

  redirect("/")
}