"use client"

interface ElementRendererProps {
  id: string
  text: string
  size: number
}

const Spacer: React.FC<ElementRendererProps> = ({ id, size = 1 }) => {
  return <div style={{ height: `${size}px` }} className={styles.spacer}></div>
}

export default Spacer
