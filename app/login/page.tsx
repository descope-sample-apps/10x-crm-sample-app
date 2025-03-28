"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Descope } from "@descope/nextjs-sdk"
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDescopeReady, setIsDescopeReady] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const onSuccess = () => {
    setIsLoading(true)
    router.push("/dashboard")
  }

  const onError = (error: any) => {
    console.error("Authentication error:", error)
    setIsLoading(false)
  }

  const onReady = () => {
    setIsDescopeReady(true)
  }

  // Don't render anything while checking authentication
  if (isSessionLoading) {
    return null
  }

  // Only render login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className={`w-full max-w-md transition-all duration-300 ${!isDescopeReady ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Sign in to your account to access your CRM dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className={`transition-opacity duration-300 ${!isDescopeReady ? 'opacity-0' : 'opacity-100'}`}>
                <Descope 
                  flowId="sign-up-or-in" 
                  onSuccess={onSuccess} 
                  onError={onError}
                  onReady={onReady}
                  theme="light" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null // Return null while redirecting
}
