import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
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
