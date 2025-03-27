import { type NextRequest, NextResponse } from "next/server"
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware"
import { customers, dummyDeals as deals } from "@/lib/dummy-data"

async function handler(request: NextRequest, context: OAuthContext) {
  try {
    // Get counts
    const contactCount = customers.length
    const dealCount = deals.length

    // Calculate total deal value
    const totalDealValue = deals.reduce((sum, deal) => sum + deal.value, 0)

    // Get deals by stage
    const dealsByStage = Object.entries(
      deals.reduce(
        (acc, deal) => {
          if (!acc[deal.stage]) {
            acc[deal.stage] = { count: 0, value: 0 }
          }
          acc[deal.stage].count++
          acc[deal.stage].value += deal.value
          return acc
        },
        {} as Record<string, { count: number; value: number }>,
      ),
    ).map(([stage, data]) => ({
      stage,
      _count: { id: data.count },
      _sum: { value: data.value },
    }))

    // Get recent contacts
    const recentContacts = [...customers]
      .sort((a, b) => new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime())
      .slice(0, 5)

    // Get recent deals with contacts
    const recentDeals = deals
      .map(deal => ({
        ...deal,
        contact: customers.find(c => c.id === deal.customerId)
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)

    return NextResponse.json({
      counts: {
        contacts: contactCount,
        deals: dealCount,
      },
      financials: {
        totalDealValue,
      },
      dealsByStage,
      recentContacts,
      recentDeals,
    })

  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

// Require analytics.read scope for GET requests
export const GET = withOAuth(handler, ["analytics:read"])

