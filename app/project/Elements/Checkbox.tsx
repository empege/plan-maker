"use client"

import { useState, useEffect } from "react"
import { useEditableContent } from "@/hooks/useEditable"
import styles from "../project.module.scss"

interface ElementProps {
  id: string
  text: string
  checked?: boolean
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
}

const Checkbox: React.FC<ElementProps> = ({ id, text, checked, color }) => {
  const { ref, handleChange, handleBlur } = useEditableContent(text, id)
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked || false)
  }, [checked])

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChecked = e.target.checked
    setIsChecked(newChecked)

    try {
      const res = await fetch(`/api/element/${id}/checkbox`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: newChecked }),
      })

      if (!res.ok) {
        console.error("Failed to update checkbox state")
        setIsChecked(!newChecked)
      }
    } catch (error) {
      console.error("Error updating checkbox state:", error)
      setIsChecked(!newChecked)
    }
  }

  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        ref={ref}
        id={id}
        contentEditable
        className={color}
        suppressContentEditableWarning={true}
        onInput={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}

export default Checkbox
