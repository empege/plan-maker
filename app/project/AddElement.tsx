"use client"

import Button from "@/components/Button/Button"
import { LuCirclePlus } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import styles from "./project.module.scss"
import { useState } from "react"

const AddElement = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [formData, setFormData] = useState({
    text: "",
    size: 0,
  })

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleOptionChange", formData)
    setSelectedOption(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      console.log(prev, name, value)
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataToSend: Record<string, string | number> = {
      element: selectedOption,
    }
    if (["title", "subtitle", "text", "checkbox"].includes(selectedOption)) {
      dataToSend.text = formData.text
    } else if (selectedOption === "spacer") {
      dataToSend.size = formData.size
    }

    const res = await fetch(`/api/project/${projectId}/element`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })

    if (!res.ok) {
      console.error("Failed to add element FE")
      return
    }

    console.log("Element added successfully")
    setOpen(false)
  }

  const resetForm = () => {
    setSelectedOption("")
    setFormData({ text: "", size: 0 })
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  const renderFields = () => {
    switch (selectedOption) {
      case "title":
      case "subtitle":
      case "text":
      case "checkbox":
        return (
          <>
            <label htmlFor='text'>Text:</label>
            <input
              type='text'
              id='text'
              name='text'
              value={formData.text}
              onChange={handleInputChange}
              placeholder={`Enter ${selectedOption}...`}
              required
            />
          </>
        )
      case "spacer":
        return (
          <>
            <label htmlFor='size'>Size:</label>
            <input
              type='number'
              id='size'
              name='size'
              value={formData.size}
              onChange={handleInputChange}
              placeholder='Enter size...'
              min='0'
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.add}>
      {/* OPEN BUTTON */}
      <div className={styles.openBtn}>
        <Button green handleClick={() => setOpen(true)}>
          <LuCirclePlus />
          <h4>Add element</h4>
        </Button>
      </div>
      {/* MODAL FORM OPEN */}
      {open && (
        <div className={styles.formModal}>
          <div className={styles.closeBtn}>
            <Button handleClick={handleClose}>
              <IoClose />
            </Button>
          </div>
          <div className={styles.overlay} onClick={handleClose}></div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Choose an element to add</h3>
            <select
              id='element'
              value={selectedOption}
              onChange={handleOptionChange}
              required
            >
              <option hidden disabled value=''>
                {" "}
                -- select an element --{" "}
              </option>
              <option value='title'>Title</option>
              <option value='subtitle'>Subtitle</option>
              <option value='checkbox'>Checkbox</option>
              <option value='spacer'>Spacer</option>
              <option value='text'>Text</option>
            </select>
            {renderFields()}
          </form>
        </div>
      )}
    </div>
  )
}

export default AddElement
