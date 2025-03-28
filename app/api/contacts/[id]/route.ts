import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, dummyDeals as deals } from "@/lib/dummy-data"

// Get a single contact by ID or email
async function handler(request: NextRequest, context: OAuthContext) {
  const identifier = request.url.split("/").pop()!

  try {
    let contact;

    // Check if the identifier is an email
    if (identifier.includes("@")) {
      contact = customers.find(c => c.email.toLowerCase() === identifier.toLowerCase())
    } else {
      contact = customers.find(c => c.id === identifier)
    }

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    // Get associated deals
    const contactDeals = deals.filter(d => d.customerId === contact.id)
    
    return NextResponse.json({ ...contact, deals: contactDeals })
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// Only export GET endpoint with contacts.read scope
export const GET = withOAuth(handler, ["contacts:read"])

