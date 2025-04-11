"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, DollarSign, BarChart } from "lucide-react";
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import { use } from "react";

interface DealPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface DashboardHeaderProps {
  heading: ReactNode;
  text: ReactNode;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  stage: string;
  customerId: string;
  ownerId: string;
  expectedCloseDate: string;
  probability: number;
  created_at?: string;
  notes?: string;
  customer?: {
    id: string;
    name: string;
    email: string;
    company: string;
  };
  owner?: {
    id: string;
    name: string;
    email: string;
    position: string;
  };
  activities?: Activity[];
  tasks?: Task[];
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  dealId: string;
  userId: string;
  created_at: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  dealId: string;
  assignedTo: string;
  created_at: string;
}

export default function DealPage({ params }: DealPageProps) {
  const { id } = use(params);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDeal() {
      try {
        setIsLoading(true);
        setError(null);

        // Get the session token from the client side
        const token = getSessionToken();

        if (!token) {
          throw new Error("No authentication token available");
        }

        // Fetch deal details
        const response = await fetch(`/api/deals/${encodeURIComponent(id)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Deal not found");
          }
          throw new Error(`Failed to fetch deal: ${response.statusText}`);
        }

        const dealData = await response.json();
        setDeal(dealData);
      } catch (err) {
        console.error("Failed to load deal:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load deal. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDeal();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Loading..."
          text="Please wait while we fetch the deal details"
        />
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Deal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <div className="md:col-span-5">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Deal Overview</CardTitle>
                    <CardDescription>
                      Key information about this deal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text="Failed to load deal" />
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </DashboardShell>
    );
  }

  if (!deal) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Not Found" text="Deal not found" />
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              The deal you're looking for doesn't exist or you don't have
              permission to view it.
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    );
  }

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
                {deal.customer ? (
                  <Link
                    href={`/dashboard/contacts/${deal.customer.id}`}
                    className="hover:underline"
                  >
                    {deal.customer.name}
                  </Link>
                ) : (
                  "Unknown Customer"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Owner: {deal.owner ? deal.owner.name : "Unassigned"}</span>
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
                {capitalizeFirst(deal.stage)}
              </div>
            </div>
            {deal.notes && (
              <div className="pt-4">
                <h4 className="text-sm font-medium">Notes</h4>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {deal.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-5">
          <Tabs
            defaultValue={deal.activities?.length ? "activities" : "overview"}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Overview</CardTitle>
                  <CardDescription>
                    Key information about this deal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {deal.customer ? (
                          <Link
                            href={`/dashboard/contacts/${deal.customer.id}`}
                            className="hover:underline"
                          >
                            {deal.customer.name}
                          </Link>
                        ) : (
                          "Unknown Customer"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Owner: {deal.owner ? deal.owner.name : "Unassigned"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{formatCurrency(deal.value)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Expected close: {formatDate(deal.expectedCloseDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Probability: {deal.probability}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>
                    Recent activities related to this deal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {deal.activities && deal.activities.length > 0 ? (
                    <div className="space-y-4">
                      {deal.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start border-b pb-4"
                        >
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
                            <p className="text-sm text-muted-foreground">
                              {formatDate(activity.date)}
                            </p>
                            <p className="text-sm">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        No activities found for this deal.
                      </p>
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
                  {deal.tasks && deal.tasks.length > 0 ? (
                    <div className="space-y-4">
                      {deal.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 mr-3"
                              checked={task.status === "completed"}
                              disabled
                            />
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Due: {formatDate(task.dueDate)}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
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
                      <p className="text-muted-foreground">
                        No tasks found for this deal.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  );
}
