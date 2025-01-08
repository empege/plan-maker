import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const email = session.user.email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    await prisma.element.deleteMany({
      where: {
        project: {
          userId: user.id,
        },
      },
    });

    await prisma.project.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account." },
      { status: 500 }
    );
  }
}
