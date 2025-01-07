import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import SignupForm from "./SignupForm"

export default async function SignupPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return <SignupForm />
}
