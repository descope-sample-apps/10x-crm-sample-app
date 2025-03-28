import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, type Customer } from "@/lib/dummy-data"

// Define the Contact interface based on our needs
interface Contact {
  id: string
  name: string
  email: string
  company: string
  tenant_id: string
  created_at: string
  last_contact: string
}

// Transform customers into contacts format
const contacts: Contact[] = customers.map(customer => ({
  id: customer.id,
  name: customer.name,
  email: customer.email,
  company: customer.company,
  tenant_id: "tenant1", // Assuming default tenant for demo
  created_at: new Date().toISOString(), // Using current date since original data doesn't have this
  last_contact: customer.lastContact
}))

async function handler(request: NextRequest, context: OAuthContext) {

  try {
    // Get query parameters
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const search = url.searchParams.get("search") || ""

    // Calculate pagination
    const from = (page - 1) * limit
    const to = from + limit

    // Filter contacts by tenant and search terms
    let filteredContacts = customers

    if (search) {
      const searchLower = search.toLowerCase()
      filteredContacts = filteredContacts.filter(customer =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.company.toLowerCase().includes(searchLower)
      )
    }

    // Sort by created_at in descending order
    filteredContacts.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // Apply pagination
    const paginatedContacts = filteredContacts.slice(from, to)
    const totalCount = filteredContacts.length

    if (paginatedContacts.length === 0) {
      return NextResponse.json({ error: "No contacts found" }, { status: 404 })
    }

    // Return response with pagination metadata
    return NextResponse.json({
      data: paginatedContacts,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// Require contacts.read scope for GET requests
export const GET = withOAuth(handler, ["contacts:read"])

