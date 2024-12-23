import { registerUser } from "@/app/actions"

export default function SignupPage() {
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
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
