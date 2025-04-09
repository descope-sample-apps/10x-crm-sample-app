import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, deals, activities } from "@/lib/dummy-data"

// Get a single contact by ID or email
async function handler(request: NextRequest, context: OAuthContext) {
  const identifier = request.url.split("/").pop()!

  // Check if the identifier is empty
  if (!identifier) {
    return NextResponse.json({ error: "Contact ID is not specified" }, { status: 400 })
  }

  try {
    let customer;

    // Check if the identifier is an email
    if (identifier.includes("@")) {
      customer = customers.find(c => c.email.toLowerCase() === identifier.toLowerCase())
    } else {
      customer = customers.find(c => c.id === identifier)
    }

    if (!customer) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    // Remove avatar from customer data
    const { avatar, ...customerWithoutAvatar } = customer

    // Check if user has both required scopes
    const hasDealsRead = context.scopes.includes("deals:read")

    if (hasDealsRead) {
      // Get associated deals with their activities
      const customerDeals = deals
        .filter(d => d.customerId === customer.id)
        .map(deal => {
          const dealActivities = activities
            .filter(a => a.dealId === deal.id)
            .map(({ customerId, ...rest }) => rest) // Remove customerId from activities
          return {
            ...deal,
            activities: dealActivities
          }
        })
      
      return NextResponse.json({
        ...customerWithoutAvatar,
        deals: customerDeals
      })
    }

    return NextResponse.json(customerWithoutAvatar)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// Only export GET endpoint with contacts.read scope
export const GET = withOAuth(handler, ["contacts:read"])

