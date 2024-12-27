"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import styles from "./navbutton.module.scss"

interface ButtonProps {
  href: string
  children: ReactNode
  target?: "_blank" | "_self" | "_parent" | "_top" | string
}

const Button: React.FC<ButtonProps> = ({ href, children, target = "" }) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      target={target}
      className={`${styles.button} ${pathname === href ? styles.active : ""}`}
    >
      {children}
    </Link>
  )
}

export default Button
