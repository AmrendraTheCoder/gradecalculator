import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes using a route matcher
const isProtectedRoute = createRouteMatcher([
  "/protected(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Check if the user is authenticated by checking for the session cookie
    const { userId } = await auth.protect(); // This is how to get the userId from the session

    if (!userId) {
      // If no userId is found, the user is not authenticated
      return new Response("Unauthorized", { status: 401 });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
