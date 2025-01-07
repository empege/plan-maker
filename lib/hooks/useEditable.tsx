import { useState, useEffect, useRef } from "react"

export const useEditableContent = (initialValue: string, id: string) => {
  const [value, setValue] = useState(initialValue)
  const ref = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const updateEndpoint = `/api/element/${id}`

  const updateElementInDB = async (newValue: string) => {
    try {
      const res = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, text: newValue }),
      })

      if (!res.ok) {
        console.error("Failed to update element")
      }
    } catch (error) {
      console.error("Error updating element:", error)
    }
  }

  const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || ""
    setValue(newValue)

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      updateElementInDB(newValue)
    }, 500)
  }

  const handleBlur = () => {
    updateElementInDB(value)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value
    }
  }, [value])

  return { ref, value, handleChange, handleBlur }
}
