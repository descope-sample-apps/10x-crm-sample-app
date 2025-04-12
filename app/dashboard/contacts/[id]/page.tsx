"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin } from "lucide-react";
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import { use } from "react";

interface ContactPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Define interfaces to match the dummy data structure
interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  lastContact: string;
  phone: string;
  address: string;
  notes: string;
  created_at?: string;
  avatar?: string;
  deals?: Deal[];
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
  activities?: Activity[];
}

interface Activity {
  id: string;
  type: string;
  customer: string;
  customerId: string;
  dealId: string;
  date: string;
  notes: string;
  completed: boolean;
}

interface DealsResponse {
  deals: Deal[];
}

interface TimelineResponse {
  activities: Activity[];
}

export default function ContactPage({ params }: ContactPageProps) {
  const { id } = use(params);
  const [contact, setContact] = useState<Contact | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);

        // Get the session token from the client side
        const token = getSessionToken();

        if (!token) {
          throw new Error("No authentication token available");
        }

        // Fetch contact details
        const contactResponse = await fetch(
          `/api/contacts/${encodeURIComponent(id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!contactResponse.ok) {
          throw new Error(
            `Failed to fetch contact: ${contactResponse.statusText}`
          );
        }

        const contactData = (await contactResponse.json()) as Contact;
        setContact(contactData);

        // Use deals from the contact response if available
        if (contactData.deals && contactData.deals.length > 0) {
          setDeals(contactData.deals);

          // Extract activities from deals
          const allActivities = contactData.deals.flatMap(
            (deal) => deal.activities || []
          );
          setActivities(allActivities);
        } else {
          // Fallback to fetching deals separately if not included in contact response
          const dealsResponse = await fetch(
            `/api/deals?search=${encodeURIComponent(id)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!dealsResponse.ok) {
            throw new Error(
              `Failed to fetch deals: ${dealsResponse.statusText}`
            );
          }

          const dealsData = (await dealsResponse.json()) as DealsResponse;
          setDeals(dealsData.deals || []);

          // Fetch activities (timeline) for each deal
          if (dealsData.deals && dealsData.deals.length > 0) {
            const activitiesPromises = dealsData.deals.map((deal) =>
              fetch(`/api/deals/${deal.id}/timeline`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                if (!res.ok) {
                  throw new Error(
                    `Failed to fetch timeline: ${res.statusText}`
                  );
                }
                return res.json() as Promise<TimelineResponse>;
              })
            );

            const activitiesResults = await Promise.all(activitiesPromises);
            const allActivities = activitiesResults.flatMap(
              (result) => result.activities || []
            );
            setActivities(allActivities);
          } else {
            setActivities([]);
          }
        }
      } catch (err) {
        console.error("Failed to load contact data:", err);
        setError("Failed to load contact data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Loading..."
          text="Please wait while we load the contact details."
        />
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
          <div className="md:col-span-5">
            <Skeleton className="h-10 w-full mb-4" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full mb-4" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error} />
      </DashboardShell>
    );
  }

  if (!contact) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Contact Not Found"
          text="The requested contact could not be found."
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={contact.name} text={contact.company} />

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.address}</span>
            </div>
            <div className="flex items-center">
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  contact.status === "active"
                    ? "bg-green-100 text-green-800"
                    : contact.status === "inactive"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {capitalizeFirst(contact.status)}
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {contact.notes}
              </p>
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
            </TabsList>

            <TabsContent value="deals">
              <Card>
                <CardHeader>
                  <CardTitle>Deals</CardTitle>
                  <CardDescription>
                    Deals associated with {contact.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {deals.length > 0 ? (
                    <div className="space-y-4">
                      {deals.map((deal) => (
                        <div
                          key={deal.id}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div>
                            <Link
                              href={`/dashboard/deals/${deal.id}`}
                              className="font-medium hover:underline"
                            >
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
                                Expected close:{" "}
                                {formatDate(deal.expectedCloseDate)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {formatCurrency(deal.value)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {deal.probability}% probability
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        No deals found for this contact.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>
                    Recent activities with {contact.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activities.length > 0 ? (
                    <div className="space-y-4">
                      {activities.map((activity) => (
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
                            <p className="text-sm">{activity.notes}</p>
                            <div className="flex items-center pt-2">
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  activity.completed
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
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
                      <p className="text-muted-foreground">
                        No activities found for this contact.
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
