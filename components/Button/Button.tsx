"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import styles from "./button.module.scss"

interface ButtonProps {
  href?: string
  children: ReactNode
  className?: string
  target?: "_blank" | "_self" | "_parent" | "_top" | string
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  className,
  target = "",
}) => {
  const pathname = usePathname()

  if (href) {
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

  return <button className={`${className}`}>{children}</button>
}

export default Button
