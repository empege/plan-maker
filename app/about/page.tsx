import Button from "@/components/Button/Button"
import styles from "./about.module.scss"

export const metadata = {
  title: "About - Plan Maker",
  description: "Welcome to Plan Maker. Manage your projects with ease.",
}

const AboutPage = () => {
  return (
    <div className={styles.about}>
      <h1>Plan Maker ☑️</h1>

      <h2>
        Plan Maker is a website where you can create small <i>projects</i> to
        track your tasks, and see other peoples progress on theirs.
      </h2>

      <p>
        Code can be viewed and reused from
        <Button
          href='https://github.com/empege/plan-maker'
          dark
          target='_blank'
        >
          GitHub
        </Button>
        . You can also see{" "}
        <i>
          <b>tasks.md</b>
        </i>{" "}
        file to see how I planned each step and what I learned while creating
        this web app.
      </p>

      <p>
        To have it working locally, other than cloning, doing <b>npm install</b>{" "}
        and having the necessary setup ready (like node etc),{" "}
        <b>you have to setup a base, SMTP and your .env file.</b> I used MySQL
        and Prisma for the base and personal cPanel email, as I never learned
        this before so it was a nice opportunity.
      </p>

      <p>
        Locally or live, you can signup, login, reset password (email will be
        sent to you), create projects, edit project header, add items to
        projects like title, subtitle, checkbox etc, or you can edit any element
        by clicking on it!
      </p>

      <p>
        <b>Only password is encrypted</b>, as anything else related to projects
        creation is visible to others anyways, so that info is not encrypted.
        But, you can see this in the code itself.
      </p>

      <h3>
        {" "}
        Created by{" "}
        <Button href='https://www.ivanmitov.com' target='_blank'>
          Ivan Mitov
        </Button>{" "}
        for the purpose of learning Next.js (app router).
      </h3>
    </div>
  )
}

export default AboutPage
