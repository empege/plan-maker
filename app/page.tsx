import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import Button from "@/components/Button/Button"
import styles from "./page.module.scss"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className={styles.wrapper}>
        <h1>Projects</h1>
        <div>
          <Button href='/login' dark>
            Create project
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h2>Welcome, {session.user?.name}!</h2>
      <h1>Projects</h1>
      <div>
        <Button href='/create'>Create project</Button>
      </div>
    </div>
  )
}
