import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, dummyDeals as deals } from "@/lib/dummy-data"

// Get a single contact
async function handler(request: NextRequest, context: OAuthContext) {
  const id = request.url.split("/").pop()!

  try {
    const contact = customers.find(c => c.id === id)
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    // Get associated deals
    const contactDeals = deals.filter(d => d.customerId === id)
    
    return NextResponse.json({ ...contact, deals: contactDeals })
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// Only export GET endpoint with contacts.read scope
export const GET = withOAuth(handler, ["contacts:read"])

