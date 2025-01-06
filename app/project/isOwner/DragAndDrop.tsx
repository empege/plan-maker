"use client"

import React, { useState } from "react"
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import styles from "../project.module.scss"
import ElementRenderer from "./ElementRenderer"

interface Element {
  id: string
  order: number
  element: string
  text?: string
  checked?: boolean
  size?: number
}

interface DragAndDropProps {
  initialElements: Element[]
  projectId: string
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  initialElements,
  projectId,
}) => {
  const [elements, setElements] = useState<Element[]>(initialElements)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = elements.findIndex((el) => el.id === active.id)
    const newIndex = elements.findIndex((el) => el.id === over.id)

    const newOrder = arrayMove(elements, oldIndex, newIndex)

    setElements(
      newOrder.map((el, index) => ({
        ...el,
        order: index + 1,
      }))
    )

    // Slanje na backend
    try {
      await fetch(`/api/project/${projectId}/element/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          newOrder.map((el, index) => ({
            id: el.id,
            order: index + 1,
          }))
        ),
      })
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.droppableContainer}>
          {elements.map((el) => (
            <DraggableElement key={el.id} {...el} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

const DraggableElement: React.FC<Element> = ({
  id,
  element,
  text,
  checked,
  size,
  order,
}) => {
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
        border: "1px solid #ddd",
        cursor: "grab",
      }}
    >
      <ElementRenderer
        id={id}
        element={element}
        text={text}
        checked={checked}
        size={size}
        order={order}
      />
    </div>
  )
}

export default DragAndDrop
