"use client"

import styles from "../project.module.scss"

interface ElementProps {
  id: string
  size: number
}

const Spacer: React.FC<ElementProps> = ({ id, size = 1 }) => {
  return <div style={{ height: `${size}px` }} className={styles.spacer}></div>
}

export default Spacer
