import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import type React from "react" // Added import for React


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OCR Image Processing",
  description: "Process images with OCR technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <main>{children}</main>
        <Toaster />
      </ThemeProvider>
      </body>
    </html>
  )
}

