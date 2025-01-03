import styles from "../project.module.scss"

interface HeaderProps {
  name: string
  description: string
}

const Header: React.FC<HeaderProps> = ({ name, description }) => {
  return (
    <div className={`${styles.header}`}>
      <div className={styles.title}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Header
