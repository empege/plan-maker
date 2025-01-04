import prisma from "@/lib/prisma"
import styles from "../project.module.scss"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { notFound } from "next/navigation"
import Header from "../isOwner/Header"
import HeaderReadOnly from "../readOnly/Header"
import ElementRenderer from "../isOwner/ElementRenderer"
import ElementRendererReadOnly from "../readOnly/ElementRenderer"

interface ElementRendererProps {
  element: "title" | "subtitle" | "checkbox" | "spacer" | "text"
  id: string
  text?: string
  checked?: boolean
  size?: number
}

const test: ElementRendererProps[] = [
  {
    element: "title",
    text: "This is a title",
    id: "1",
  },
  {
    element: "subtitle",
    text: "This is a subtitle",
    id: "2",
  },
  {
    element: "checkbox",
    text: "This is a checkbox",
    checked: false,
    id: "3",
  },
  {
    element: "spacer",
    id: "5",
    size: 8,
  },
  {
    element: "text",
    text: "This is text",
    id: "4",
  },
]

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
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
          {test.map((current) => (
            <ElementRenderer key={current.id} {...current} />
          ))}
        </div>
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
          {test.map((current) => (
            <ElementRendererReadOnly key={current.id} {...current} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
