"use client"

import styles from "../project.module.scss"
import { useState, useEffect, useRef } from "react"

interface ElementRendererProps {
  id: string
  text: string
}

const Subtitle: React.FC<ElementRendererProps> = ({ id, text }) => {
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
    <h3
      className={styles.subtitle}
      ref={ref}
      id={id}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
    ></h3>
  )
}

export default Subtitle
