import type { Metadata } from "next"
import { Geist, Geist_Mono, Bungee } from "next/font/google"
import "./globals.scss"
import styles from "./layout.module.scss"
import Navigation from "@/components/Navigation/Navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const bungee = Bungee({
  weight: "400",
  variable: "--font-bungee",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Plan-Maker",
  description: "Simple but usefull plan app!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable}`}
      >
        <Navigation />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}
