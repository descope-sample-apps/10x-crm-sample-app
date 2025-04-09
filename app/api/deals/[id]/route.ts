import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { deals, customers, dealOwners, activities, tasks } from "@/lib/dummy-data"

// Get a single deal
async function getHandler(request: NextRequest, context: OAuthContext, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const deal = deals.find(d => d.id === id)
    if (!deal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 })
    }

    // Get associated data
    const customer = customers.find(c => c.id === deal.customerId)
    const owner = dealOwners.find(o => o.id === deal.ownerId)
    const dealActivities = activities
      .filter(a => a.dealId === deal.id)
      .map(({ customerId, ...rest }) => rest) // Remove customerId from activities
    const dealTasks = tasks.filter(t => t.dealId === deal.id)

    return NextResponse.json({
      ...deal,
      customer: customer ? {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        company: customer.company
      } : null,
      owner: owner ? {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        position: owner.position
      } : null,
      activities: dealActivities,
      tasks: dealTasks
    })

  } catch (error) {
    console.error("Error fetching deal:", error)
    return NextResponse.json({ error: "Failed to fetch deal" }, { status: 500 })
  }
}

// Only export GET endpoint with deals.read scope
export const GET = withOAuth(
  (request: NextRequest, context: OAuthContext) =>
    getHandler(request, context, { params: { id: request.url.split("/").pop()! } }),
  ["deals:read"],
)

