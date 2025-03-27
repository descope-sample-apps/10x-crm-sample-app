import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Users, DollarSign, Calendar } from "lucide-react"

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
                    Manage your customer relationships with ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our CRM platform helps you track leads, close deals, and grow your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>CRM Dashboard Preview</CardTitle>
                    <CardDescription>A glimpse of what you'll get</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center">
                          <Users className="h-8 w-8 text-primary mb-2" />
                          <p className="text-sm font-medium">Contacts</p>
                          <p className="text-2xl font-bold">128</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center">
                          <DollarSign className="h-8 w-8 text-primary mb-2" />
                          <p className="text-sm font-medium">Revenue</p>
                          <p className="text-2xl font-bold">$24.5k</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center">
                          <BarChart3 className="h-8 w-8 text-primary mb-2" />
                          <p className="text-sm font-medium">Deals</p>
                          <p className="text-2xl font-bold">36</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center">
                          <Calendar className="h-8 w-8 text-primary mb-2" />
                          <p className="text-sm font-medium">Tasks</p>
                          <p className="text-2xl font-bold">12</p>
                        </CardContent>
                      </Card>
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

