"use client"

import styles from "../project.module.scss"
import { colorMap } from "@/lib/colorMap"

interface ElementProps {
  id: string
  size: number
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
  line?: boolean
}

const Spacer: React.FC<ElementProps> = ({
  size = 0,
  color = "black",
  line,
}) => {
  const resolvedColor = color ? colorMap[color] : undefined
  return (
    <div
      style={{
        height: `${size}px`,
        borderBottom:
          line && resolvedColor ? `2px solid ${resolvedColor}` : undefined,
      }}
      className={styles.spacer}
    ></div>
  )
}

export default Spacer
