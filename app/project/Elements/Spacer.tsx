"use client"

import styles from "../project.module.scss"

interface ElementProps {
  id: string
  size: number
  color?: "black" | "white" | "red" | "green" | "dark-green" | "golden"
  line?: boolean
}

const colorMap: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f8f8f8",
  red: "#e63946",
  green: "#20b2aa",
  "dark-green": "#157a73",
  golden: "#ffcc00",
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
