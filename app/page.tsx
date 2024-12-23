import styles from "./page.module.scss"
import RegisterForm from "@/components/RegistrationForm"
import { cookies } from "next/headers"

export default async function Home() {
  const cookiesList = await cookies()

  const userCookie = cookiesList.get("user")
  console.log(userCookie)

  if (!userCookie) {
    return <p>You are not logged in.</p>
  }

  const user = JSON.parse(userCookie.value)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>All Projects</h1>
        <h2>Welcome back, {user.name}</h2>
        <RegisterForm />
      </main>
    </div>
  )
}
