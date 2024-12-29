'use server'

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";

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