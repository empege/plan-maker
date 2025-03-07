import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const projectId = params.id;

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { element, text, size, color, line } = body;

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

    if (element === "spacer" && (parsedSize === null || isNaN(parsedSize) || parsedSize < 0)) {
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
        color: color || "black",
        line: element === "spacer" ? !!line : false
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
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { order: newOrder } = await req.json();

    if (newOrder === undefined || newOrder < 1) {
      return NextResponse.json(
        { error: "Invalid order value" },
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

    const { projectId, order: oldOrder } = element;

    if (newOrder === oldOrder) {
      return NextResponse.json({
        message: "Order value is unchanged",
      });
    }

    if (newOrder > oldOrder) {
      await prisma.element.updateMany({
        where: {
          projectId,
          order: {
            gte: oldOrder + 1,
            lte: newOrder,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.element.updateMany({
        where: {
          projectId,
          order: {
            gte: newOrder,
            lt: oldOrder,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    await prisma.element.update({
      where: { id },
      data: { order: newOrder },
    });

    return NextResponse.json({ message: "Element order updated successfully" });
  } catch (error) {
    console.error("Error updating element order:", error);
    return NextResponse.json(
      { error: "Failed to update element order" },
      { status: 500 }
    );
  }
}
