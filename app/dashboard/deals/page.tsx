"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Search } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Define interfaces to match the API response structure
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
}

interface DealsResponse {
  data: Deal[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDeals() {
      try {
        setIsLoading(true);
        setError(null);

        // Get the session token from the client side
        const token = getSessionToken();

        if (!token) {
          throw new Error("No authentication token available");
        }

        // Make the API request with the token
        const response = await fetch(
          `/api/deals${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch deals: ${response.statusText}`);
        }

        const data = (await response.json()) as DealsResponse;
        setDeals(data.data || []);
      } catch (err) {
        console.error("Failed to load deals:", err);
        setError("Failed to load deals. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(loadDeals, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <DashboardShell>
      <div className="flex justify-between items-center">
        <DashboardHeader
          heading="Deals"
          text="Manage your sales deals."
        />
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[300px] text-sm">
                This demo grants full scopes and API access. To test access with different scopes, check out our <a href="https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share" className="text-primary underline hover:underline">Postman Collection</a>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal Name</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Expected Close</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeleton rows
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-[150px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[150px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-red-500"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : deals.length > 0 ? (
                  deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/dashboard/deals/${deal.id}`}
                          className="hover:underline"
                        >
                          {deal.name}
                        </Link>
                      </TableCell>
                      <TableCell>{deal.customer?.name || "Unknown"}</TableCell>
                      <TableCell>{deal.owner?.name || "Unassigned"}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${deal.stage === "qualified"
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
                      </TableCell>
                      <TableCell>{formatDate(deal.expectedCloseDate)}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(deal.value)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No deals found matching "{searchQuery}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
