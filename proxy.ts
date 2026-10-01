import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-session";

/**
 * Next.js 16 Proxy (formerly Middleware).
 * Protects all /admin/* routes — redirects unauthenticated requests to /admin/login.
 */
export async function proxy(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    const token = req.cookies.get("weguide_admin_session")?.value;
    if (!token)
      return NextResponse.redirect(new URL("/admin/login", req.url));
    try {
      await verifyAdminSession(token);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
