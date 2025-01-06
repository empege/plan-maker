"use client"

import Button from "@/components/Button/Button"
import { LuCirclePlus } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import styles from "./project.module.scss"
import { useState } from "react"
import { useRouter } from "next/navigation"

const AddElement = ({ projectId }: { projectId: string }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [formData, setFormData] = useState({
    text: "",
    size: 0,
    color: "",
    line: false,
  })

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
  }
  const handleLineCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: checked,
      }
    })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      color: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataToSend: Record<string, string | number | boolean> = {
      element: selectedOption,
    }
    if (["title", "subtitle", "text", "checkbox"].includes(selectedOption)) {
      dataToSend.text = formData.text
      dataToSend.color = formData.color
    } else if (selectedOption === "spacer") {
      dataToSend.size = formData.size
      dataToSend.color = formData.color
      dataToSend.line = formData.line
    }
    const res = await fetch(`/api/project/${projectId}/element`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })

    if (!res.ok) {
      return
    }

    handleClose()
    router.refresh()
  }

  const resetForm = () => {
    setSelectedOption("")
    setFormData({ text: "", size: 0, color: "", line: false })
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
            <ColorForm
              color={formData.color}
              handleColorChange={handleColorChange}
            />
            <Button type='submit'>Add</Button>
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
            <label htmlFor='line'>Line:</label>
            <input
              type='checkbox'
              id='line'
              name='line'
              onChange={handleLineCheckboxChange}
            />
            <ColorForm
              color={formData.color}
              handleColorChange={handleColorChange}
            />
            <Button type='submit'>Add</Button>
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

const ColorForm = ({
  color,
  handleColorChange,
}: {
  color: string
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <>
      <label htmlFor='text-color'>Text color:</label>
      <select
        name='text-color'
        id='text-color'
        value={color}
        onChange={handleColorChange}
      >
        <option value='black'>Black</option>
        <option value='white'>White</option>
        <option value='red'>Red</option>
        <option value='green'>Green</option>
        <option value='dark-green'>Dark green</option>
        <option value='golden'>Golden</option>
      </select>
    </>
  )
}

export default AddElement
