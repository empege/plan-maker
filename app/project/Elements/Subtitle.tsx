"use client"

import styles from "../project.module.scss"
import { useEditableContent } from "@/hooks/useEditable"

interface ElementProps {
  id: string
  text: string
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
}

const Subtitle: React.FC<ElementProps> = ({ id, text, color }) => {
  const { ref, handleChange, handleBlur } = useEditableContent(text, id)

  return (
    <h3
      className={`${styles.subtitleElement} ${color}`}
      ref={ref}
      id={id}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
      onBlur={handleBlur}
    ></h3>
  )
}

export default Subtitle
