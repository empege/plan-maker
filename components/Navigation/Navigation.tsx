import Button from "@/components/Button/Button"
import styles from "./navigation.module.scss"

const Navigation = () => {
  return (
    <div>
      <nav className={styles.navigation}>
        <span className={styles.email}>ivan.mitov@hotmail.com</span>
        <ul className={styles.wrapper}>
          <li className={styles.item}>
            <Button href='/'>Projects</Button>
          </li>
          <li className={styles.item}>
            <Button href='/signup'>Signup</Button>
          </li>
          <li className={styles.item}>
            <Button href='/login'>Login</Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
