import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    const projectId = params.id;

    const body = await req.json();
    console.log("body: ", body);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { element, text, size } = body;

    if (!element) {
      return NextResponse.json(
        { error: "Element type is required" },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.element.findFirst({
      where: { projectId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = (maxOrder?.order || 0) + 1;

    const parsedSize = element === "spacer" ? parseInt(size, 10) : null;

    if (element === "spacer" && (!parsedSize || isNaN(parsedSize) || parsedSize < 0)) {
      return NextResponse.json(
        { error: "Size must be a valid non-negative number" },
        { status: 400 }
      );
    }

    const elementData = await prisma.element.create({
      data: {
        element,
        text: ["title", "subtitle", "text", "checkbox"].includes(element)
          ? text
          : null,
        size: parsedSize,
        checked: element === "checkbox" ? false : null,
        projectId,
        order,
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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Element ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.element.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Element deleted successfully" });
  } catch (error) {
    console.error("Error deleting element:", error);
    return NextResponse.json(
      { error: "Failed to delete element" },
      { status: 500 }
    );
  }
};
