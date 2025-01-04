"use client"

import styles from "../project.module.scss"
import { useState, useEffect, useRef } from "react"

interface ElementProps {
  id: string
  text: string
}

const Title: React.FC<ElementProps> = ({ id, text }) => {
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
    <h2
      className={styles.title}
      ref={ref}
      id={id}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
    ></h2>
  )
}

export default Title
