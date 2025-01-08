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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: { name: true, description: true },
  })

  return {
    title: `${project?.name} - Plan Maker`,
    description: project?.description || "Manage your tasks efficiently.",
  }
}

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
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
          {project.elements.map(
            ({ element, id, order, text, size, checked, color, line }) => (
              <ElementRendererReadOnly
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
      </div>
    </div>
  )
}

export default ProjectPage
