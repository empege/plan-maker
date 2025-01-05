import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = await params.id;
    const { element, text, size } = await req.json();

    if (!element) {
      return NextResponse.json(
        { error: "Element type is required" },
        { status: 400 }
      );
    }

    const elementData = await prisma.element.create({
      data: {
        element,
        text: ["title", "subtitle", "text", "checkbox"].includes(element)
          ? text
          : null,
        size: element === "spacer" ? size : null,
        checked: element === "checkbox" ? false : null,
        projectId,
      },
    });

    return NextResponse.json({
      message: "Element added successfully",
      elementData,
    });
  } catch (error) {
    console.error("Error adding element:", error);
    return NextResponse.json(
      { error: "Failed to add element BE" },
      { status: 500 }
    );
  }
}
