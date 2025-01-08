import VerifyClient from "./VerifyClient"

export const metadata = {
  title: "Verify Your Account - Plan Maker",
  description: "Verify your account to activate your Plan Maker account.",
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div>
      <h1>Account Verification</h1>
      <VerifyClient token={token} />
    </div>
  )
}
