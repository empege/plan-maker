"use client"

import styles from "../project.module.scss"
import DeleteProjectForm from "./DeleteProjectForm"
import { useState } from "react"
import Button from "@/components/Button/Button"
import { useRouter } from "next/navigation"

interface HeaderProps {
  name: string
  description: string
  projectId: string
}

const Header: React.FC<HeaderProps> = ({ name, description, projectId }) => {
  const router = useRouter()
  const [editActive, setEditActive] = useState(false)
  const [title, setTitle] = useState(name)
  const [desc, setDesc] = useState(description)

  const handleEdit = () => {
    setEditActive(true)
  }

  const handleCancel = () => {
    setTitle(name)
    setDesc(description)
    setEditActive(false)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`/api/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: title, description: desc }),
    })
    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Something went wrong.")
      return
    }

    if (res.ok) {
      alert(data.error || "Project updated successfully.")
      setEditActive(false)
      router.push(`/project/${projectId}`)
      router.refresh()
    }
  }

  return (
    <div className={`${styles.header}`}>
      {!editActive && (
        <>
          <div className={styles.title}>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          <div>
            <Button handleClick={handleEdit}>Edit</Button>
            <br />
            <br />
            <DeleteProjectForm id={projectId} />
          </div>
        </>
      )}
      {editActive && (
        <form onSubmit={handleSave}>
          <div className={styles.title}>
            <input
              autoFocus
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <Button type='submit'>Save</Button>
            <br />
            <br />
            <Button type='button' handleClick={handleCancel} dark>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Header
