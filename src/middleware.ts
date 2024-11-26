import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isRootRoute = createRouteMatcher(["/"]); // Added matcher for root route

export default clerkMiddleware(async (auth, request) => {
  if (isRootRoute(request)) {
    // Construct the absolute URL for redirect
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard"; // Set the path to /dashboard
    return NextResponse.redirect(url); // Redirect to the absolute URL
  }
  if (!isPublicRoute(request)) {
    // Protect all non-public routes
    await auth.protect();
  }

  // Returning response for the next middleware or request handler
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
