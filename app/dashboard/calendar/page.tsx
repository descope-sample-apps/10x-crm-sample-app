import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { activities } from "@/lib/dummy-data"

export default function CalendarPage() {
  // Get current date
  const date = new Date()

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="Manage your schedule and appointments.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your upcoming meetings and events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Activities</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities
                .filter((activity) => !activity.completed)
                .slice(0, 5)
                .map((activity) => (
                  <div key={activity.id} className="flex items-start">
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
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} with {activity.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                      <p className="text-sm text-muted-foreground">{activity.notes}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

