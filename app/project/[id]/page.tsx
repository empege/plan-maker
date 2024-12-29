import prisma from "@/lib/prisma"
import styles from "./project.module.scss"
import DeleteForm from "./DeleteForm"

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  })

  console.log(project)

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{project?.name}</h1>
          <p>Project description</p>
        </div>
        <DeleteForm id={id} />
      </div>
      <div className={styles.main}></div>
    </div>
  )
}

export default ProjectPage
