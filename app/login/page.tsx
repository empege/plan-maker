import { loginUser } from "@/app/actions"

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form action={loginUser}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' required />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
