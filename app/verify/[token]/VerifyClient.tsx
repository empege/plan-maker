"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyClient({ token }: { token: string }) {
  const router = useRouter()
  const [message, setMessage] = useState("Verifying your account...")

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await fetch(`/api/auth/verify/${token}`)

        if (!res.ok) {
          const { error } = await res.json()
          setMessage(error || "Verification failed.")
          return
        }

        const { message } = await res.json()
        setMessage(message)
        setTimeout(() => router.push("/login"), 5000)
      } catch (error) {
        console.log("Verification error:", error)
        setMessage("An error occurred during verification. Try again please.")
      }
    }

    verifyAccount()
  }, [token, router])

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  )
}
