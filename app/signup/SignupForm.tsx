"use client"

import { useState } from "react"
import Button from "@/components/Button/Button"
import { useRouter } from "next/navigation"
import ReCAPTCHA from "react-google-recaptcha"

export default function SignupForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [message, setMessage] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA first!")
      return
    }

    if (form.password !== form.password2) {
      setMessage("Passwords do not match!")
      return
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const errorData = await res.json()
      setMessage(errorData.error || "Signup failed")
      return
    }

    setMessage(
      "Verification email sent! Check your inbox. Redirecting to login page in 5 seconds..."
    )

    setTimeout(() => router.push("/login"), 5000)
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor='password2'>Confirm Password:</label>
          <input
            id='password2'
            type='password2'
            value={form.password2}
            onChange={(e) => setForm({ ...form, password2: e.target.value })}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={handleCaptchaChange}
        />
        <Button type='submit'>Sign up!</Button>
      </form>
      {message && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
      )}
    </div>
  )
}
