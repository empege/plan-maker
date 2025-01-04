"use client"

import { useState, useEffect, useRef } from "react"
import styles from "../project.module.scss"

interface ElementProps {
  id: string
  text: string
  checked?: boolean | null
}

const Checkbox: React.FC<ElementProps> = ({ id, text, checked }) => {
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
    <div className={styles.checkbox}>
      <input type='checkbox' id={id} />
      <div
        ref={ref}
        id={id}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleChange}
      />
    </div>
  )
}

export default Checkbox
