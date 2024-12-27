import Button from "@/components/NavButton/NavButton"
import styles from "./navigation.module.scss"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import LogoutButton from "../NavButton/LogoutButton"

const Navigation = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navigation}>
        <span className={styles.email}>ivan.mitov@hotmail.com</span>
        <ul className={styles.flex}>
          <li className={styles.item}>
            <Button href='/'>Projects</Button>
          </li>
          {!session && (
            <>
              <li className={styles.item}>
                <Button href='/signup'>Signup</Button>
              </li>
              <li className={styles.item}>
                <Button href='/login'>Login</Button>
              </li>
            </>
          )}
          {session && (
            <>
              <li className={styles.item}>
                <Button href='/create'>Create</Button>
              </li>
              <li className={styles.item}>
                <Button href='/profile'>Profile</Button>
              </li>
              <li className={styles.item}>
                <LogoutButton>Logout</LogoutButton>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
