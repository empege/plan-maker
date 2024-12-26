import styles from "./page.module.scss"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log("session: ", session)

  if (!session) {
    return <h1>All Projects</h1>
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Your email is: {session.user.email}</p>
      </main>
    </div>
  )
}
