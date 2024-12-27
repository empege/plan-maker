"use client"

import { signOut } from "next-auth/react"
import styles from "./navbutton.module.scss"
import { ReactNode } from "react"

interface LogoutButtonProps {
  children: ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }
  return (
    <button onClick={handleLogout} className={`${styles.button}`}>
      {children}
    </button>
  )
}

export default LogoutButton
