import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dummyDeals as deals, customers, activities } from "@/lib/dummy-data"
import { Edit, Trash2, User, Calendar, DollarSign, BarChart } from "lucide-react"
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils"

interface DealPageProps {
  params: {
    id: string
  }
}

export default async function DealPage({ params }: DealPageProps) {
  // Await params before using
  const { id } = await Promise.resolve(params)
  
  const deal = deals.find((d) => d.id === id)

  if (!deal) {
    notFound()
  }

  const customer = customers.find((c) => c.id === deal.customerId)
  const dealActivities = activities.filter((activity) => activity.customerId === deal.customerId)

  return (
    <DashboardShell>
      <DashboardHeader
        heading={deal.name}
        text={`${capitalizeFirst(deal.stage)} - ${formatCurrency(deal.value)}`}
      >
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
            <CardTitle>Deal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {customer ? (
                  <Link href={`/dashboard/contacts/${customer.id}`} className="hover:underline">
                    {customer.name}
                  </Link>
                ) : (
                  "Unknown Customer"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{formatCurrency(deal.value)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Expected close: {formatDate(deal.expectedCloseDate)}</span>
            </div>
            <div className="flex items-center">
              <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Probability: {deal.probability}%</span>
            </div>
            <div className="flex items-center">
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
                {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground mt-1">{deal.notes}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2 w-full">
              <Button className="w-full" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button className="w-full" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-5">
          <Tabs defaultValue="activities" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="activities">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>Recent activities related to this deal</CardDescription>
                  </div>
                  <Button size="sm">Add Activity</Button>
                </CardHeader>
                <CardContent>
                  {dealActivities.length > 0 ? (
                    <div className="space-y-4">
                      {dealActivities.map((activity) => (
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
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
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
                      <p className="text-muted-foreground">No activities found for this deal.</p>
                      <Button variant="link">Create a new activity</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Tasks related to this deal</CardDescription>
                  </div>
                  <Button size="sm">Add Task</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-3" />
                        <div>
                          <p className="font-medium">Follow up with client about proposal</p>
                          <p className="text-sm text-muted-foreground">Due: 2023-04-20</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-3" />
                        <div>
                          <p className="font-medium">Prepare contract draft</p>
                          <p className="text-sm text-muted-foreground">Due: 2023-04-25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-3" />
                        <div>
                          <p className="font-medium">Schedule final negotiation call</p>
                          <p className="text-sm text-muted-foreground">Due: 2023-05-01</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Files</CardTitle>
                    <CardDescription>Documents related to this deal</CardDescription>
                  </div>
                  <Button size="sm">Upload File</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-700 text-xs font-bold">PDF</span>
                        </div>
                        <div>
                          <p className="font-medium">Proposal_v1.pdf</p>
                          <p className="text-sm text-muted-foreground">Uploaded on 2023-03-15</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-700 text-xs font-bold">XLS</span>
                        </div>
                        <div>
                          <p className="font-medium">Pricing_Sheet.xlsx</p>
                          <p className="text-sm text-muted-foreground">Uploaded on 2023-03-10</p>
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

