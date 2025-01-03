import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized - not logged in" }, { status: 401 });
  }

  const { id } = await params

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    })

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    if (project.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized - not creator user" }, { status: 401 });
    }

    await prisma.project.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: "Project deleted successfully" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized - not logged in" }, { status: 401 });
  }

  const { id } = await params
  const { name, description } = await req.json()

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    })

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    if (project.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized - not creator user" }, { status: 401 });
    }

    await prisma.project.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })

    return NextResponse.json({ message: "Project updated successfully" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}