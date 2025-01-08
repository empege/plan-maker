"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Button from "@/components/Button/Button"
import Loading from "@/components/Loading/Loading"
import ReCAPTCHA from "react-google-recaptcha"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { status } = useSession()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!captchaToken) {
      setError("Please complete the CAPTCHA first!")
      return
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError(result.error)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
      router.refresh()
    } else if (status === "unauthenticated") {
      setIsLoading(false)
    }
  }, [status, router])

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  if (isLoading || status === "loading") {
    return <Loading />
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={handleCaptchaChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type='submit'>Log in</Button>
        <br />
        <div>
          <p>Not a user?</p>
          <Button href='/signup' dark>
            Sign up!
          </Button>
        </div>
        <br />
        <div>
          <p>Forgot your password?</p>
          <Button href='/forgot' dark>
            Reset here
          </Button>
        </div>
      </form>
    </div>
  )
}
