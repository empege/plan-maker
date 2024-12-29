"use client"

import Button from "@/components/Button/Button"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

const DeleteForm = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleDeleteProject = async (e: FormEvent) => {
    e.preventDefault()
    const userConfirmed = confirm(
      "Are you sure you want to delete this project?"
    )
    if (!userConfirmed) {
      return
    }

    try {
      const res = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || "Failed to delete project")
        return
      }
      alert("Project deleted successfully")
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleDeleteProject}>
      <Button dark type='submit'>
        Delete
      </Button>
    </form>
  )
}

export default DeleteForm
