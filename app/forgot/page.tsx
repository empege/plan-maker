"use client"

import Button from "@/components/Button/Button"
import styles from "./forgot.module.scss"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA first!")
      return
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || "Something went wrong.")
        return
      }

      setMessage(
        "If this email is registered, you will receive a password reset link."
      )
    } catch (error) {
      console.error(error)
      setMessage("An error occurred. Please try again.")
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  return (
    <section className={styles.section}>
      <h1>Reset your password</h1>
      <h3>
        Enter your email and new password will be sent to it if you are
        registered already
      </h3>
      <h3>
        Please make sure to change your password when you login with password
        sent to your email
      </h3>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={handleCaptchaChange}
        />
        <Button type='submit'>Reset password</Button>
      </form>
      {message && <p>{message}</p>}
    </section>
  )
}

export default ForgotPasswordPage
