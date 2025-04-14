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
import { formatDate, capitalizeFirst } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Define the contact interface to match the dummy data structure
interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  lastContact: string;
  phone?: string;
  address?: string;
  notes?: string;
  created_at?: string;
  avatar?: string;
}

interface ContactsResponse {
  contacts: Contact[];
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
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
          `/api/contacts/search${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch contacts: ${response.statusText}`);
        }

        const data = (await response.json()) as ContactsResponse;
        setContacts(data.contacts || []);
      } catch (err) {
        console.error("Failed to load contacts:", err);
        setError("Failed to load contacts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(loadContacts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <DashboardShell>
      <div className="flex justify-between items-center">
        <DashboardHeader
          heading="Contacts"
          text="Manage your customer contacts."
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
              placeholder="Search contacts..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
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
                        <Skeleton className="h-4 w-[200px]" />
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
                ) : contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/dashboard/contacts/${contact.id}`}
                          className="hover:underline"
                        >
                          {contact.name}
                        </Link>
                      </TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${contact.status === "active"
                              ? "bg-green-100 text-green-800"
                              : contact.status === "inactive"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {capitalizeFirst(contact.status)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(contact.lastContact)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No contacts found
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
