import prisma from "@/lib/prisma"
import styles from "./projects.module.scss"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"

const Projects = async () => {
  const session = await getServerSession(authOptions)

  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
  })

  const personalProjects = projects.filter(
    (project) => project.userId === session?.user.id
  )
  const otherProjects = projects.filter(
    (project) => project.userId !== session?.user.id
  )

  return (
    <>
      {session && (
        <>
          <section className={styles.section}>
            <h2>Your projects</h2>
            <div className={styles.wrapper}>
              {personalProjects.map((project) => {
                return (
                  <article className={styles.article} key={project.id}>
                    <a href={`/project/${project.id}`}>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <span>
                        Creator: <i>{project.user.name}</i>
                      </span>
                    </a>
                  </article>
                )
              })}
              {!(personalProjects.length > 0) && <h4>No Projects Yet 🙃</h4>}
            </div>
          </section>
          <section className={styles.section}>
            <h2>Check what other users created</h2>
            <div className={styles.wrapper}>
              {otherProjects.map((project) => {
                return (
                  <article className={styles.article} key={project.id}>
                    <a href={`/project/${project.id}`}>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <span>
                        Creator: <i>{project.user.name}</i>
                      </span>
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
                    <span>
                      Creator: <i>{project.user.name}</i>
                    </span>
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
