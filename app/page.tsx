import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode, BookOpen, Plug, Database, Github, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-background to-muted/50 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Descope
                    <br />
                      Inbound Apps
                    <br />
                    Starter App
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-[600px]">
                    This is a sample application to showcase how you can turn your app into an OAuth identity provider while leaving the heavy-lifting of authentication, scopes and permissions, and token management to us. Explore how it works!
                  </p>
                  <div className="flex flex-col gap-4 min-[400px]:flex-row">
                    <Link
                      href="https://github.com/descope-sample-apps/10x-crm-sample-app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" variant="outline" className="w-full sm:w-auto bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5">
                            <Image
                              src="/github-mark-white.svg"
                              alt="GitHub"
                              fill
                              className="dark:hidden"
                            />
                            <Image
                              src="/github-mark.svg"
                              alt="GitHub"
                              fill
                              className="hidden dark:block"
                            />
                          </div>
                          <span>GitHub Repo</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl">Learn More</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-muted-foreground">
                      These resources will help you learn, experiment with, and deploy your own Inbound App.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link
                        href="https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent/50 active:bg-accent transition-colors group h-full">
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-primary/10 mb-4">
                              <FileCode className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">Postman Collection with Auth</p>
                            <p className="text-lg sm:text-xl font-bold mt-1 underline md:no-underline md:group-hover:underline">Test the APIs</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link
                        href="https://docs.descope.com/inbound-apps"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent/50 active:bg-accent transition-colors group h-full">
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-primary/10 mb-4">
                              <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">Inbound Apps Documentation</p>
                            <p className="text-lg sm:text-xl font-bold mt-1 underline md:no-underline md:group-hover:underline">Descope Docs</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link
                        href="https://connectedagent.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent/50 active:bg-accent transition-colors group h-full">
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-primary/10 mb-4">
                              <Plug className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">AI Agent connecting to 10x CRM</p>
                            <p className="text-lg sm:text-xl font-bold mt-1 underline md:no-underline md:group-hover:underline">Connected Agent</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link href="/dashboard">
                        <Card className="hover:bg-accent/50 active:bg-accent transition-colors group h-full">
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-primary/10 mb-4">
                              <Database className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">See where the data comes from</p>
                            <p className="text-lg sm:text-xl font-bold mt-1 underline md:no-underline md:group-hover:underline">10x CRM</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

