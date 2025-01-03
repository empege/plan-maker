"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import styles from "./button.module.scss"

interface ButtonProps {
  href?: string
  children: ReactNode
  type?: "button" | "submit" | "reset"
  target?: "_blank" | "_self" | "_parent" | "_top" | string
  handleClick?: () => void
  dark?: boolean
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  type = "button",
  target = "_self",
  handleClick,
  dark = false,
}) => {
  const pathname = usePathname()

  if (!href) {
    return (
      <button
        onClick={handleClick}
        type={type}
        className={`${styles.button} ${dark && styles.dark}`}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      target={target}
      className={`${styles.button} ${pathname === href ? styles.active : ""} ${
        dark && styles.dark
      }`}
    >
      {children}
    </Link>
  )
}

export default Button
