import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Element ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { checked } = body;

    if (typeof checked !== "boolean") {
      return NextResponse.json(
        { error: "Invalid checked value, must be a boolean" },
        { status: 400 }
      );
    }

    const element = await prisma.element.findUnique({
      where: { id },
    });

    if (!element) {
      return NextResponse.json(
        { error: "Element not found" },
        { status: 404 }
      );
    }

    await prisma.element.update({
      where: { id },
      data: { checked },
    });

    return NextResponse.json({ message: "Element updated successfully" });
  } catch (error) {
    console.error("Error updating element:", error);
    return NextResponse.json(
      { error: "Failed to update element" },
      { status: 500 }
    );
  }
}
