import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { dummyDeals, customers, type Deal } from "@/lib/dummy-data"

async function handler(request: NextRequest, context: OAuthContext) {

  try {
    // Get query parameters
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const search = url.searchParams.get("search") || ""
    const stage = url.searchParams.get("stage") || ""

    // Calculate pagination
    const from = (page - 1) * limit
    const to = from + limit

    // Filter and enrich deals with customer data
    let filteredDeals = dummyDeals.map(deal => {
      const customer = customers.find(c => c.id === deal.customerId)
      return {
        ...deal,
        contact: customer ? {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          company: customer.company
        } : null
      }
    })

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase()
      filteredDeals = filteredDeals.filter(deal =>
        deal.name.toLowerCase().includes(searchLower)
      )
    }

    // Apply stage filter if provided
    if (stage) {
      filteredDeals = filteredDeals.filter(deal => deal.stage === stage)
    }

    // Sort by created_at in descending order
    filteredDeals.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // Apply pagination
    const paginatedDeals = filteredDeals.slice(from, to)
    const totalCount = filteredDeals.length

    // Return response with pagination metadata
    return NextResponse.json({
      data: paginatedDeals,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching deals:", error)
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
  }
}

// GET endpoint
export const GET = withOAuth(handler, ["deals:read"])