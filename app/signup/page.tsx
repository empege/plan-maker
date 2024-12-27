import { registerUser } from "@/app/actions"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Button from "@/components/Button/Button"

export default async function SignupPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form action={registerUser}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' name='name' required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' required />
        </div>
        <Button type='submit'>Sign up!</Button>
      </form>
    </div>
  )
}
