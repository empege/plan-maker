"use client"

import styles from "../project.module.scss"
import { useEffect, useState } from "react"
import Loader from "../Elements/Loader"
import { colorMap } from "@/lib/colorMap"

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

const Title = ({
  text,
  color,
}: {
  text: string
  color: string | undefined
}) => <h2 className={`${styles.title} ${color}`}>{text}</h2>

const Subtitle = ({
  text,
  color,
}: {
  text: string
  color: string | undefined
}) => <h3 className={`${styles.subtitle} ${color}`}>{text}</h3>

const Text = ({ text, color }: { text: string; color: string | undefined }) => (
  <div className={`${styles.text} ${color}`}>{text}</div>
)

const Checkbox = ({
  text,
  color,
  checked,
}: {
  text: string
  color: string | undefined
  checked: boolean
}) => (
  <div className={styles.checkbox}>
    <input type='checkbox' defaultChecked={checked} />
    <div className={color}>{text}</div>
  </div>
)

const Spacer = ({
  color,
  size,
  line,
}: {
  color: string | undefined
  size: number
  line: boolean | undefined
}) => {
  const resolvedColor = color ? colorMap[color] : undefined
  return (
    <div
      style={{
        height: `${size}px`,
        borderBottom:
          line && resolvedColor ? `2px solid ${resolvedColor}` : undefined,
      }}
      className={styles.spacer}
    ></div>
  )
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  id,
  text = "",
  checked = false,
  size = 1,
  color,
  line,
}) => {
  const [elementToUse, setElementToUse] = useState<React.JSX.Element | null>(
    null
  )

  useEffect(() => {
    const getElement = () => {
      switch (element) {
        case "title":
          return <Title text={text} color={color} />
        case "subtitle":
          return <Subtitle text={text} color={color} />
        case "checkbox":
          return <Checkbox checked={checked} text={text} color={color} />
        case "text":
          return <Text text={text} color={color} />
        case "spacer":
          return <Spacer size={size} color={color} line={line} />

        default:
          return <p>Invalid element type</p>
      }
    }
    setElementToUse(getElement())
  }, [element, id, text, checked, size, line, color])

  return (
    <div className={`${styles.element} ${styles.readOnly}`}>
      {elementToUse || <Loader />}{" "}
    </div>
  )
}

export default ElementRenderer
