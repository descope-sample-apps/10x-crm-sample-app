import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, deals, activities } from "@/lib/dummy-data"

// Define the Contact interface based on our needs
interface Contact {
  id: string
  name: string
  email: string
  company: string
  created_at: string
  last_contact: string
  status: string
}
// Transform customers into contacts format
const contacts: Contact[] = customers.map(customer => ({
  id: customer.id,
  name: customer.name,
  email: customer.email,
  company: customer.company,
  created_at: customer.created_at,
  last_contact: customer.lastContact,
  status: customer.status,
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

    // Filter customers by search terms
    let filteredCustomers = customers

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.company.toLowerCase().includes(searchLower)
      )
    }

    // Sort by created_at in descending order
    filteredCustomers.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // Check if user has both required scopes
    const hasDealsRead = context.scopes.includes("deals:read")

    // Apply pagination and prepare response data
    const paginatedCustomers = filteredCustomers
      .slice(from, to)
      .map(customer => {
        const { avatar, ...customerWithoutAvatar } = customer
        
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
          
          return {
            ...customerWithoutAvatar,
            deals: customerDeals
          }
        }
        
        return customerWithoutAvatar
      })

    const totalCount = filteredCustomers.length

    if (paginatedCustomers.length === 0) {
      return NextResponse.json({ error: "No contacts found" }, { status: 404 })
    }

    // Return response with pagination metadata
    return NextResponse.json({
      data: paginatedCustomers,
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

