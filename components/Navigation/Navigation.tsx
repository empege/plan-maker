import Button from "@/components/NavButton/NavButton"
import styles from "./navigation.module.scss"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import LogoutButton from "../NavButton/LogoutButton"
import Image from "next/image"
import logo from "../../public/logo.png"

const Navigation = async () => {
  const session = await getServerSession(authOptions)

  return (
    <nav className={styles.navigation}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Button href='https://ivanmitov.com' target='_blank'>
              <Image src={logo} layout='fill' alt='Logo' />
            </Button>
          </div>
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
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.container}>
          <span className={styles.email}>ivan.mitov@hotmail.com</span>
          <Button href='https://github.com/empege/plan-maker' target='_blank'>
            Check Code
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
