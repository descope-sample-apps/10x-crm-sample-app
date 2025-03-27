"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Descope } from "@descope/nextjs-sdk"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSuccess = () => {
    setIsLoading(true)
    router.push("/dashboard")
  }

  const onError = (error: any) => {
    console.error("Authentication error:", error)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to your account to access your CRM dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <Descope flowId="sign-up-or-in" onSuccess={onSuccess} onError={onError} theme="light" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

