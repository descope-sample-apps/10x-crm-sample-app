import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { dummyDeals, customers } from "@/lib/dummy-data"

// Get a single deal
async function getHandler(request: NextRequest, context: OAuthContext, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const deal = dummyDeals.find(d => d.id === id)
    if (!deal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 })
    }

    const customer = customers.find(c => c.id === deal.customerId)
    return NextResponse.json({ ...deal, customer })

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

