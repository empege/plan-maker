"use client"

import { signOut } from "next-auth/react"
import styles from "./navbutton.module.scss"
import { ReactNode } from "react"

interface LogoutButtonProps {
  children: ReactNode
  dark?: boolean
}

const LogoutButton = ({ children, dark }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }
  return (
    <button
      onClick={handleLogout}
      className={`${styles.button} ${dark && styles.dark}`}
    >
      {children}
    </button>
  )
}

export default LogoutButton
