import VerifyClient from "./VerifyClient"

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
