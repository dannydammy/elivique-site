import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Clerk runs ONLY on the member routes (see matcher), so every marketing page stays
 * static and ships no auth JavaScript. With no Clerk keys configured the member area
 * shows a "not open yet" page instead of failing.
 */
const isProtected = createRouteMatcher(["/account(.*)"]);
const clerkOn = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

const withClerk = clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export default function proxy(req: NextRequest, ev: Parameters<typeof withClerk>[1]) {
  return clerkOn ? withClerk(req, ev) : NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/sign-in/:path*", "/sign-up/:path*"],
};
