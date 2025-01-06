import prisma from "@/lib/prisma"
import styles from "../project.module.scss"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { notFound } from "next/navigation"
import Header from "../isOwner/Header"
import HeaderReadOnly from "../readOnly/Header"
import ElementRenderer from "../isOwner/ElementRenderer"
import ElementRendererReadOnly from "../readOnly/ElementRenderer"
import AddElement from "../AddElement"

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      elements: { orderBy: { order: "asc" } },
    },
  })

  if (!project) {
    notFound()
  }

  const session = await getServerSession(authOptions)
  const isOwner = session?.user?.email === project?.user.email

  if (isOwner) {
    return (
      <div>
        <Header
          name={project.name}
          description={project.description}
          projectId={id}
        />
        <div className={styles.main}>
          {project.elements.map(
            ({ element, id, order, text, size, checked, color, line }) => (
              <ElementRenderer
                key={id}
                id={id}
                order={order}
                text={text || undefined}
                size={size || undefined}
                checked={checked || undefined}
                line={line || false}
                color={
                  color as
                    | "black"
                    | "white"
                    | "red"
                    | "green"
                    | "dark-green"
                    | "golden"
                }
                element={
                  element as
                    | "title"
                    | "subtitle"
                    | "checkbox"
                    | "text"
                    | "spacer"
                }
              />
            )
          )}
        </div>
        <AddElement projectId={id} />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.header}>
        <HeaderReadOnly name={project.name} description={project.description} />
      </div>
      <div className={styles.main}>
        <div className={styles.main}>
          {project.elements.map((current) => (
            <ElementRendererReadOnly key={current.id} {...current} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
