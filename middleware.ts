import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Mock middleware - allow all requests for now
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
