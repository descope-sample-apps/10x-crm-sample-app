import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { deals, customers, activities, tasks, dealOwners } from "@/lib/dummy-data"
import { User, Calendar, DollarSign, BarChart } from "lucide-react"
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
  const dealOwner = dealOwners.find((o) => o.id === deal.ownerId)
  const dealActivities = activities.filter((activity) => activity.dealId === id)
  const dealTasks = tasks.filter((task) => task.dealId === id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading={deal.name}
        text={`${capitalizeFirst(deal.stage)} - ${formatCurrency(deal.value)}`}
      />

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
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                Owner: {dealOwner ? dealOwner.name : "Unassigned"}
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
        </Card>

        <div className="md:col-span-5">
          <Tabs defaultValue="activities" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>Recent activities related to this deal</CardDescription>
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Tasks related to this deal</CardDescription>
                </CardHeader>
                <CardContent>
                  {dealTasks.length > 0 ? (
                    <div className="space-y-4">
                      {dealTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between border-b pb-4">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 rounded border-gray-300 mr-3" 
                              defaultChecked={task.status === 'completed'}
                              disabled
                            />
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            </div>
                          </div>
                          <div>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mr-2 ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "medium"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {capitalizeFirst(task.priority)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No tasks found for this deal.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

