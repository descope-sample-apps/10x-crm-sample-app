"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { formatDate, formatTaskStatus } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getSessionToken } from "@descope/nextjs-sdk/client"
import { Skeleton } from "@/components/ui/skeleton"

interface Task {
  id: string
  title: string
  description: string
  dealId: string
  dealOwnerId: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  assignee?: string
  created_at: string
}

interface Deal {
  id: string
  name: string
  value: number
  stage: string
  customerId: string
  ownerId: string
  expectedCloseDate: string
  probability: number
  created_at: string
  notes?: string
  owner?: {
    id: string
    name: string
    email: string
    position: string
  }
  tasks?: Task[]
}

export default function CalendarPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getSessionToken();
        
        // Fetch deals with a higher limit to get more tasks
        const dealsResponse = await fetch('/api/deals?limit=50', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!dealsResponse.ok) {
          throw new Error('Failed to fetch deals');
        }
        
        const dealsData = await dealsResponse.json();
        setDeals(dealsData.data || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get current date
  const date = new Date()

  // Get all tasks from deals and filter upcoming ones
  const allTasks = deals.flatMap(deal => deal.tasks || []);
  const upcomingTasks = allTasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3)

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Calendar" text="Manage your schedule and tasks." />
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your organization's calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Your organization's next tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text="Failed to load calendar" />
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="Manage your schedule and tasks." />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your organization's calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={() => {}}
                className="rounded-md border w-full min-w-[300px]"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your organization's next tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => {
                  const deal = deals.find(d => d.id === task.dealId)
                  return (
                    <div key={task.id} className="flex items-start">
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          task.priority === "high"
                            ? "bg-red-100"
                            : task.priority === "medium"
                              ? "bg-orange-100"
                              : "bg-blue-100"
                        }`}
                      >
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <div className="ml-3 space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {task.title}
                        </p>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          <p className="truncate">Due: {formatDate(task.dueDate)}</p>
                          <p className="truncate">Deal: {deal?.name}</p>
                          <p className="truncate">Owner: {deal?.owner?.name}</p>
                          <p className="truncate">Status: {formatTaskStatus(task.status)}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No upcoming tasks found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

