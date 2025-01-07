"use client"

import styles from "../project.module.scss"
import { useEditableContent } from "@/hooks/useEditable"

interface ElementProps {
  id: string
  text: string
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
}

const Text: React.FC<ElementProps> = ({ id, text, color }) => {
  const { ref, handleChange, handleBlur } = useEditableContent(text, id)

  return (
    <div
      ref={ref}
      className={`${styles.text} ${color}`}
      id={id}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
      onBlur={handleBlur}
    ></div>
  )
}

export default Text
