"use client"

import styles from "../project.module.scss"
import { useState, useEffect, useRef } from "react"

interface ElementProps {
  id: string
  text: string
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
}

const Text: React.FC<ElementProps> = ({ id, text, color }) => {
  const [value, setValue] = useState(text)
  const ref = useRef<HTMLDivElement>(null)
  const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setValue(e.currentTarget.textContent || "")
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value
    }
  }, [value])

  return (
    <div
      ref={ref}
      className={`${styles.text} ${color}`}
      id={id}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
    ></div>
  )
}

export default Text
