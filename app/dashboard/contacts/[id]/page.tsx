import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { customers, dummyDeals as deals, activities, type Deal, type Activity } from "@/lib/dummy-data"
import { Edit, Trash2, Mail, Phone, MapPin, FileText } from "lucide-react"
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils"

interface ContactPageProps {
  params: {
    id: string
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { id } = await Promise.resolve(params)
  
  const customer = customers.find((c) => c.id === id)

  if (!customer) {
    notFound()
  }

  const customerDeals = deals.filter((deal: Deal) => deal.customerId === customer.id)
  const customerActivities = activities.filter((activity: Activity) => activity.customerId === customer.id)

  return (
    <DashboardShell>
      <DashboardHeader heading={customer.name} text={customer.company}>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{customer.address}</span>
            </div>
            <div className="flex items-center">
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  customer.status === "active"
                    ? "bg-green-100 text-green-800"
                    : customer.status === "inactive"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {capitalizeFirst(customer.status)}
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground mt-1">{customer.notes}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2 w-full">
              <Button className="w-full" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button className="w-full" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-5">
          <Tabs defaultValue="deals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="deals">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Deals</CardTitle>
                    <CardDescription>Deals associated with {customer.name}</CardDescription>
                  </div>
                  <Link href="/dashboard/deals/new">
                    <Button size="sm">Add Deal</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {customerDeals.length > 0 ? (
                    <div className="space-y-4">
                      {customerDeals.map((deal) => (
                        <div key={deal.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <Link href={`/dashboard/deals/${deal.id}`} className="font-medium hover:underline">
                              {deal.name}
                            </Link>
                            <div className="flex items-center mt-1">
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  deal.stage === "qualified"
                                    ? "bg-blue-100 text-blue-800"
                                    : deal.stage === "proposal"
                                      ? "bg-purple-100 text-purple-800"
                                      : deal.stage === "negotiation"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                              >
                                {capitalizeFirst(deal.stage)}
                              </div>
                              <span className="text-sm text-muted-foreground ml-2">
                                Expected close: {formatDate(deal.expectedCloseDate)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(deal.value)}</div>
                            <div className="text-sm text-muted-foreground">{deal.probability}% probability</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No deals found for this contact.</p>
                      <Link href="/dashboard/deals/new">
                        <Button variant="link">Create a new deal</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>Recent activities with {customer.name}</CardDescription>
                  </div>
                  <Button size="sm">Add Activity</Button>
                </CardHeader>
                <CardContent>
                  {customerActivities.length > 0 ? (
                    <div className="space-y-4">
                      {customerActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start border-b pb-4">
                          <div
                            className={`mt-0.5 rounded-full p-1 ${
                              activity.type === "call"
                                ? "bg-blue-100"
                                : activity.type === "email"
                                  ? "bg-green-100"
                                  : activity.type === "meeting"
                                    ? "bg-purple-100"
                                    : "bg-orange-100"
                            }`}
                          >
                            <div className="h-2 w-2 rounded-full bg-current" />
                          </div>
                          <div className="ml-3 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {capitalizeFirst(activity.type)}
                            </p>
                            <p className="text-sm text-muted-foreground">{formatDate(activity.date)}</p>
                            <p className="text-sm">{activity.notes}</p>
                            <div className="flex items-center pt-2">
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  activity.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {activity.completed ? "Completed" : "Pending"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No activities found for this contact.</p>
                      <Button variant="link">Create a new activity</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Files</CardTitle>
                    <CardDescription>Documents and files related to {customer.name}</CardDescription>
                  </div>
                  <Button size="sm">Upload File</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">Contract_2023.pdf</p>
                          <p className="text-sm text-muted-foreground">Uploaded on 2023-03-15</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">Proposal_Q2.xlsx</p>
                          <p className="text-sm text-muted-foreground">Uploaded on 2023-02-28</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-purple-500 mr-3" />
                        <div>
                          <p className="font-medium">Meeting_Notes.docx</p>
                          <p className="text-sm text-muted-foreground">Uploaded on 2023-01-15</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

