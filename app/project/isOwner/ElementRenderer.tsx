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
  checked,
  size = 0,
}) => {
  const [elementToUse, setElementToUse] = useState<React.JSX.Element | null>(
    null
  )

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
          <Button>
            <MdDelete />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ElementRenderer
