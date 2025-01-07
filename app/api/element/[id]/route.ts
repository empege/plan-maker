import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { text } = await req.json();

    if (!id || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid request body or missing ID" },
        { status: 400 }
      );
    }

    await prisma.element.update({
      where: { id },
      data: { text },
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
