import type { Metadata } from "next"
import { Geist, Geist_Mono, Bungee } from "next/font/google"
import "./globals.scss"
import styles from "./page.module.scss"
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

export const metadata = {
  title: "Plan Maker",
  description: "An intuitive tool to manage projects and tasks effectively.",
  keywords: "project management, task planning, productivity tool",
  author: "Ivan Mitov",
} as Metadata

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
