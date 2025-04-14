import { type NextRequest, NextResponse } from "next/server";
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware";
import { deals, customers, dealOwners, activities, tasks } from "@/lib/dummy-data";

async function handler(request: NextRequest, context: OAuthContext) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get("page") || "1");
    const limit = Number.parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const stage = url.searchParams.get("stage") || "";

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit;

    // Filter and enrich deals with customer, owner, activities, and tasks data
    let filteredDeals = deals.map((deal) => {
      const customer = customers.find((c) => c.id === deal.customerId);
      const owner = dealOwners.find((o) => o.id === deal.ownerId);
      const dealActivities = activities
        .filter((a) => a.dealId === deal.id)
        .map(({ customerId, ...rest }) => rest); // Remove customerId from activities
      const dealTasks = tasks.filter((t) => t.dealId === deal.id);

      return {
        ...deal,
        customer: customer
          ? {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              company: customer.company,
            }
          : null,
        owner: owner
          ? {
              id: owner.id,
              name: owner.name,
              email: owner.email,
              position: owner.position,
            }
          : null,
        activities: dealActivities,
        tasks: dealTasks,
      };
    });

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredDeals = filteredDeals.filter(
        (deal) =>
          deal.name.toLowerCase().includes(searchLower) ||
          (deal.customer &&
            deal.customer.name.toLowerCase().includes(searchLower))
      );
    }

    // Apply stage filter if provided
    if (stage) {
      filteredDeals = filteredDeals.filter((deal) => deal.stage === stage);
    }

    // Sort by created_at in descending order
    filteredDeals.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Apply pagination
    const paginatedDeals = filteredDeals.slice(from, to);
    const totalCount = filteredDeals.length;

    if (paginatedDeals.length === 0 && page === 1) {
      return NextResponse.json({
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          pages: 0,
        },
      });
    }

    // Return response with pagination metadata
    return NextResponse.json({
      data: paginatedDeals,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}

// Only export GET endpoint with deals:read scope
export const GET = withOAuth(handler, ["deals:read"]);
