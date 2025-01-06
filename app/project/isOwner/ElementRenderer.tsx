"use client"

import styles from "../project.module.scss"
import Text from "../Elements/Text"
import Title from "../Elements/Title"
import Subtitle from "../Elements/Subtitle"
import Checkbox from "../Elements/Checkbox"
import Spacer from "../Elements/Spacer"
import Button from "@/components/Button/Button"
import { MdDelete } from "react-icons/md"
import { useEffect, useState } from "react"
import Loader from "../Elements/Loader"
import { useRouter } from "next/navigation"

interface ElementRendererProps {
  element: "title" | "subtitle" | "checkbox" | "text" | "spacer"
  id: string
  text?: string
  checked?: boolean
  size?: number
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  id,
  text = "",
  checked = false,
  size = 1,
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

      console.log("Element deleted successfully")
      router.refresh()
    } catch (error) {
      console.error("Error deleting element:", error)
    }
  }

  useEffect(() => {
    const getElement = () => {
      switch (element) {
        case "title":
          return <Title id={id} text={text} />
        case "subtitle":
          return <Subtitle id={id} text={text} />
        case "checkbox":
          return <Checkbox id={id} checked={checked} text={text} />
        case "text":
          return <Text id={id} text={text} />
        case "spacer":
          return <Spacer id={id} size={size} />

        default:
          return <p>Invalid element type</p>
      }
    }
    setElementToUse(getElement())
  }, [element, id, text, checked, size])

  return (
    <div className={styles.element}>
      {elementToUse || <Loader />}{" "}
      {elementToUse && (
        <div className={styles.actions}>
          <Button handleClick={handleElementDelete}>
            <MdDelete />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ElementRenderer
