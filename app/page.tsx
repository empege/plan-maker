import styles from "./page.module.css"
import RegisterForm from "@/components/RegistrationForm"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RegisterForm />
      </main>
    </div>
  )
}
