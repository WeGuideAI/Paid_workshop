import { SignJWT, jwtVerify } from "jose";

const secretKey =
  process.env.ADMIN_SESSION_SECRET ||
  "super_secret_weguide_admin_session_key_2026_default_fallback_secret";
const secret = new TextEncoder().encode(secretKey);

export async function createAdminSession(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyAdminSession(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
