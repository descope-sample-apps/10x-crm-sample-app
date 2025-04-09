import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Search } from "lucide-react"
import { deals, type Deal, customers, dealOwners } from "@/lib/dummy-data"
import Link from "next/link"
import { formatCurrency, formatDate, capitalizeFirst } from "@/lib/utils"

export default function DealsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Deals" text="Manage your sales pipeline." />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search deals..." className="w-full pl-8" />
          </div>
        </div>
        <div className="rounded-md border">
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
              {deals.map((deal: Deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/deals/${deal.id}`} className="hover:underline">
                      {deal.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {customers.find(c => c.id === deal.customerId)?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>
                    {dealOwners.find(o => o.id === deal.ownerId)?.name || 'Unassigned'}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{formatDate(deal.expectedCloseDate)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(deal.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  )
}

