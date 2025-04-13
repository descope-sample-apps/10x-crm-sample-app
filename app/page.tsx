import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileCode, BookOpen, Plug, Database, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Descope Inbound Apps Starter App
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  This is a sample application to showcase how you can turn your app into an OAuth identity provider while leaving the heavy-lifting of authentication, scopes and permissions, and token management to us. Explore how it works!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link 
                        href="https://github.com/descope-sample-apps/crm-inbound-apps" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >                    <Button size="lg">
                      Github Repo
                      <Github className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Learn more</CardTitle>
                    <CardDescription>These resources will help you learn, experiment with, and deploy your own Inbound App.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Link 
                        href="https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-4 flex flex-col items-center">
                            <FileCode className="h-8 w-8 text-primary mb-2" />
                            <p className="text-sm font-medium">Postman Collection with Auth</p>
                            <p className="text-2xl font-bold">Test the APIs</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link 
                        href="https://docs.descope.com/inbound-apps" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-4 flex flex-col items-center">
                            <BookOpen className="h-8 w-8 text-primary mb-2" />
                            <p className="text-sm font-medium">Inbound Apps documentation</p>
                            <p className="text-2xl font-bold">Descope Docs Site</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link 
                        href="https://connectedagent.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-4 flex flex-col items-center">
                            <Plug className="h-8 w-8 text-primary mb-2" />
                            <p className="text-sm font-medium">AI Agent connecting to 10x-CRM</p>
                            <p className="text-2xl font-bold">Connected Agent</p>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link 
                        href="/dashboard" 
                      >                        
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-4 flex flex-col items-center">
                            <Database className="h-8 w-8 text-primary mb-2" />
                            <p className="text-sm font-medium">See where the data comes from</p>
                            <p className="text-2xl font-bold">10x-CRM</p>
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

