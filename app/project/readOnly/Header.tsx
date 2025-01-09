import styles from "../project.module.scss"

interface HeaderProps {
  name: string
  description: string
  creator: string
}

const Header: React.FC<HeaderProps> = ({ name, description, creator }) => {
  return (
    <div className={`${styles.header}`}>
      <div className={styles.title}>
        <span>
          Creator: <i>{creator}</i>
        </span>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Header
