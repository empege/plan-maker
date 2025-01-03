import Button from "@/components/Button/Button"
import styles from "./page.module.scss"

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Not Found Page</h1>
      <Button href='/' dark>
        Go home
      </Button>
    </div>
  )
}

export default NotFoundPage
