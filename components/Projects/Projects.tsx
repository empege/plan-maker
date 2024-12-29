import prisma from "@/lib/prisma"
import styles from "./projects.module.scss"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"

const Projects = async () => {
  const session = await getServerSession(authOptions)
  console.log("session: ", session)

  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
  })

  return (
    <>
      {session && (
        <>
          <section className={styles.section}>
            <h2>Your projects</h2>
            <div className={styles.wrapper}>
              {projects
                .filter((project) => project.userId === session.user.id)
                .map((project) => {
                  return (
                    <article className={styles.article} key={project.id}>
                      <a href={`/project/${project.id}`}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                      </a>
                    </article>
                  )
                })}
            </div>
          </section>
          <section className={styles.section}>
            <h2>Check what other users created</h2>
            <div className={styles.wrapper}>
              {projects
                .filter((project) => project.userId !== session.user.id)
                .map((project) => {
                  return (
                    <article className={styles.article} key={project.id}>
                      <a href={`/project/${project.id}`}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                      </a>
                    </article>
                  )
                })}
            </div>
          </section>
        </>
      )}
      {!session && (
        <section className={styles.section}>
          <h2>Check what other users created</h2>
          <div className={styles.wrapper}>
            {projects.map((project) => {
              return (
                <article className={styles.article} key={project.id}>
                  <a href={`/project/${project.id}`}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </a>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}

export default Projects
