import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import styles from "./page.module.scss"
import Projects from "@/components/Projects/Projects"
import Button from "@/components/Button/Button"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className={styles.wrapper}>
        <h1>Projects</h1>
        <div>
          <Button href='/login' dark>
            Create a project
          </Button>
        </div>
        <Projects />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h2>Welcome, {session.user?.name}!</h2>
      <h1>Projects</h1>
      <div>
        <Button href='/create'>Create a project</Button>
      </div>
      <Projects />
    </div>
  )
}
