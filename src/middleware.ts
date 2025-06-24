import { NextResponse } from "next/server";

export function middleware(request: any) {
  const response = NextResponse.next();

  // Check if the request is for JS or CSS files
  if (
    request.nextUrl.pathname.endsWith(".js") ||
    request.nextUrl.pathname.endsWith(".css")
  ) {
    // Set CORS headers to allow all origins
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  return response;
}

// Optionally, specify which paths the middleware applies to
export const config = {
  matcher: ["/scripts/:path*", "/styles/:path*"], // Adjust based on your file structure
};
