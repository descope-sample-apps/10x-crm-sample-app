"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentSales } from "@/components/recent-sales"
import { Overview } from "@/components/overview"
import { useEffect, useState } from "react"
import { getSessionToken } from "@descope/nextjs-sdk/client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface DashboardMetrics {
  totalCustomers: number;
  activeDeals: number;
  pendingTasks: number;
  revenue: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalCustomers: 0,
    activeDeals: 0,
    pendingTasks: 0,
    revenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const token = await getSessionToken();

        // Fetch contacts
        const contactsResponse = await fetch('/api/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const contactsData = await contactsResponse.json();

        // Fetch deals
        const dealsResponse = await fetch('/api/deals', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const dealsData = await dealsResponse.json();

        // Calculate metrics
        const totalCustomers = contactsData.pagination?.total || 0;
        const activeDeals = dealsData.data?.length || 0;

        // Fetch tasks for each deal
        const tasksPromises = dealsData.data?.map(async (deal: any) => {
          const dealResponse = await fetch(`/api/deals/${deal.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const dealData = await dealResponse.json();
          return dealData.tasks?.filter((task: any) => task.status !== 'completed').length || 0;
        }) || [];

        const tasksCounts = await Promise.all(tasksPromises);
        const pendingTasks = tasksCounts.reduce((acc, count) => acc + count, 0);

        const revenue = dealsData.data?.reduce((acc: number, deal: any) => {
          return acc + (deal.value || 0);
        }, 0) || 0;

        setMetrics({
          totalCustomers,
          activeDeals,
          pendingTasks,
          revenue
        });
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-2">
          <DashboardHeader heading="Dashboard" text="Overview of your CRM metrics and activities." />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : metrics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Active customers in your CRM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : metrics.activeDeals}</div>
              <p className="text-xs text-muted-foreground">Deals in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : `$${metrics.revenue.toLocaleString()}`}</div>
              <p className="text-xs text-muted-foreground">Total value of active deals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : metrics.pendingTasks}</div>
              <p className="text-xs text-muted-foreground">Tasks to be completed</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 mt-4 grid-cols-1 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 5 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

