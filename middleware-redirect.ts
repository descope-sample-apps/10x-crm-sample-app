import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only run this middleware for private routes
  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/contacts") ||
    request.nextUrl.pathname.startsWith("/deals");

  if (isPrivateRoute) {
    // Get the current URL
    const url = request.nextUrl.clone();

    // Create the redirect URL with the current path as a parameter
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", url.pathname + url.search);

    // Return the redirect response
    return NextResponse.redirect(redirectUrl);
  }

  // For non-private routes, continue as normal
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/contacts/:path*", "/deals/:path*"],
};
