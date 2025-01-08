"use client"

import styles from "../project.module.scss"
import Text from "../Elements/Text"
import Title from "../Elements/Title"
import Subtitle from "../Elements/Subtitle"
import Checkbox from "../Elements/Checkbox"
import Spacer from "../Elements/Spacer"
import Button from "@/components/Button/Button"
import { MdDelete, MdEdit } from "react-icons/md"
import { useEffect, useState } from "react"
import Loader from "../Elements/Loader"
import { useRouter } from "next/navigation"

interface ElementRendererProps {
  element: "title" | "subtitle" | "checkbox" | "text" | "spacer"
  id: string
  order: number
  text?: string
  checked?: boolean
  size?: number
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
  line?: boolean
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  id,
  order,
  text = "",
  checked = false,
  size = 1,
  color,
  line,
}) => {
  const router = useRouter()
  const [elementToUse, setElementToUse] = useState<React.JSX.Element | null>(
    null
  )

  const handleElementDelete = async () => {
    try {
      const res = await fetch(`/api/project/${id}/element`, {
        method: "DELETE",
      })

      if (!res.ok) {
        console.error("Failed to delete element")
        return
      }

      router.refresh()
    } catch (error) {
      console.error("Error deleting element:", error)
    }
  }

  const handleOrderChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const newOrder = Number(formData.get("order"))

    if (isNaN(newOrder) || newOrder < 1) {
      console.error("Invalid order value")
      return
    }

    try {
      const res = await fetch(`/api/project/${id}/element`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: newOrder }),
      })

      if (!res.ok) {
        console.error("Failed to change element order")
        return
      }

      router.refresh()
    } catch (error) {
      console.error("Error changing element order:", error)
    }
  }

  useEffect(() => {
    const getElement = () => {
      switch (element) {
        case "title":
          return <Title id={id} text={text} color={color} />
        case "subtitle":
          return <Subtitle id={id} text={text} color={color} />
        case "checkbox":
          return (
            <Checkbox id={id} checked={checked} text={text} color={color} />
          )
        case "text":
          return <Text id={id} text={text} color={color} />
        case "spacer":
          return <Spacer id={id} size={size} color={color} line={line} />

        default:
          return <p>Invalid element type</p>
      }
    }
    setElementToUse(getElement())
  }, [element, id, text, checked, size, line, color])

  return (
    <div className={styles.element}>
      {elementToUse || <Loader />}{" "}
      {elementToUse && (
        <div className={styles.actions}>
          <form onSubmit={handleOrderChange}>
            <span>
              Order: <b>{order}</b>
            </span>
            <label htmlFor={`order-${id}`}>New order:</label>
            <input
              type='number'
              id={`order-${id}`}
              name='order'
              min='1'
              defaultValue={order}
            />
            <Button green type='submit'>
              Change order
            </Button>
          </form>
          <Button handleClick={handleElementDelete}>
            <MdDelete />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ElementRenderer
