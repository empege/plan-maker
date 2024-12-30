"use client"

import Loading from "@/components/Loading/Loading"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Button from "@/components/Button/Button"
import { useState, useEffect } from "react"
import styles from "./profile.module.scss"

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [name, setName] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const handleChangeInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password1 || !password2) {
      alert("Password fields cannot be empty")
      return
    }
    if (password1 !== password2) {
      alert("Passwords do not match")
      return
    }

    const confirmed = confirm("Are you sure you want to change your info?")
    if (!confirmed) {
      return
    }

    try {
      const res = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: session?.user.email,
          password: password1,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || "Failed to update user")
        return
      }

      alert("Info updated successfully")
      signOut()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [status, session, router])

  return (
    <div>
      {session?.user.name ? (
        <section className={styles.section}>
          <h1>Hi {session.user.name},</h1>
          <h2>How are you today?</h2>
          <h3>You can change your name or password below</h3>
          <form onSubmit={handleChangeInfo}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                id='name'
                type='text'
                name='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>New password:</label>
              <input
                id='password1'
                type='password'
                name='password1'
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Confirm password:</label>
              <input
                id='password2'
                type='password'
                name='password2'
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <Button type='submit'>Change info</Button>
          </form>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default ProfilePage
