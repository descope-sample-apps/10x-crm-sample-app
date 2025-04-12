import { type NextRequest, NextResponse } from "next/server";
import { withOAuth, type OAuthContext } from "@/lib/oauth-middleware";
import { customers, type Customer } from "@/lib/dummy-data";

// Define the response type for the contacts search
interface ContactSearchResponse {
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    company: string;
    status: string;
    lastContact: string;
  }>;
  total: number;
  page: number;
  pageSize: number;
}

// Contacts search API
async function handler(request: NextRequest, context: OAuthContext) {
  try {
    // Get search parameters from URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Extract search parameters
    const query = searchParams.get("query") || "";
    const company = searchParams.get("company") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    // Validate parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        {
          error: "Invalid pagination parameters",
        },
        { status: 400 }
      );
    }

    // Filter contacts based on search criteria
    let filteredContacts = [...customers];

    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerQuery) ||
          contact.email.toLowerCase().includes(lowerQuery)
      );
    }

    if (company) {
      const lowerCompany = company.toLowerCase();
      filteredContacts = filteredContacts.filter((contact) =>
        contact.company.toLowerCase().includes(lowerCompany)
      );
    }

    if (status) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.status === status
      );
    }

    // Get total count before pagination
    const total = filteredContacts.length;

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedContacts = filteredContacts.slice(
      startIndex,
      startIndex + pageSize
    );

    // Map to response format
    const contacts = paginatedContacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      company: contact.company,
      status: contact.status,
      lastContact: contact.lastContact,
    }));

    // Prepare response
    const response: ContactSearchResponse = {
      contacts: contacts,
      total: total,
      page: page,
      pageSize: pageSize,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error searching contacts:", error);
    return NextResponse.json(
      { error: "Failed to search contacts" },
      { status: 500 }
    );
  }
}

// Only export GET endpoint with contacts.read scope
export const GET = withOAuth(handler, ["contacts:read"]);
