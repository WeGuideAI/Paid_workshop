import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  (await cookies()).delete("weguide_admin_session");
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
