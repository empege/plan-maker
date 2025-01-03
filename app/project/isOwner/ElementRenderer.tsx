"use client"

import styles from "../project.module.scss"
import Text from "../Elements/Text"
import Title from "../Elements/Title"
import Subtitle from "../Elements/Subtitle"
import Checkbox from "../Elements/Checkbox"
import Button from "@/components/Button/Button"
import { MdDelete } from "react-icons/md"

interface ElementRendererProps {
  id: string
  element: string
  text: string
  checked?: boolean | null
  size?: number
}

const Spacer: React.FC<ElementRendererProps> = ({ size = 1 }) => {
  return <div style={{ height: `${size}px` }} className={styles.spacer}></div>
}

const ElementRenderer: React.FC<ElementRendererProps> = (
  props: ElementRendererProps
) => {
  const elementToUse = () => {
    switch (props.element) {
      case "title":
        return <Title {...props} />
      case "subtitle":
        return <Subtitle {...props} />
      case "checkbox":
        return <Checkbox {...props} />
      case "text":
        return <Text {...props} />
      case "spacer":
        return <Spacer {...props} />

      default:
        break
    }
  }

  return (
    <div className={styles.element}>
      {elementToUse()}{" "}
      <div className={styles.actions}>
        <Button>
          <MdDelete />
        </Button>
      </div>
    </div>
  )
}

export default ElementRenderer
