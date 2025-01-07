import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as SMTPTransport.Options);
  const verificationUrl = `${process.env.BASE_URL}/verify/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Account",
    html: `
      <p>Click the link below to verify your account:</p>
      <p><b><a href="${verificationUrl}">Verify Account</a></b></p>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
