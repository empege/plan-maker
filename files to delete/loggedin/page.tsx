"use client"

import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session, status } = useSession()
  // const loading = status === "loading"
  console.log(session, status)

  if (!session) {
    return <p>You are not logged in.</p>
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Your email is: {session.user.email}</p>
    </div>
  )
}
