import { RiLoaderFill } from "react-icons/ri"
import styles from "./loading.module.scss"

const Loading = () => {
  return (
    <h1 className={styles.loading}>
      <div className={styles.active}>
        <RiLoaderFill />
      </div>
      <div className={styles.static}>
        <RiLoaderFill />
      </div>
      <span className={styles.text}>Loading...</span>
    </h1>
  )
}

export default Loading
