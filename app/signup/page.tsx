import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import SignupForm from "./SignupForm"

export const metadata = {
  title: "Sign Up - Plan Maker",
  description:
    "Create an account on Plan Maker and start managing your projects.",
}

export default async function SignupPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return <SignupForm />
}
