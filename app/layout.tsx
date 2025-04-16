import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@descope/nextjs-sdk"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CRM App | Descope Inbound Apps",
  description: "A demonstration of Descope Inbound Apps",
  icons: {
    icon: "/10x_CRM-Icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}>
          <ThemeProvider defaultTheme="system">
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'