import crypto from "node:crypto";

export const SESSION_COOKIE = "pkp_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set in .env.local");
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyCredentials(username, password) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) return false;
  return username === validUser && password === validPass;
}

export function createSessionToken(username) {
  const payload = `${username}.${Date.now() + SESSION_MAX_AGE * 1000}`;
  const signature = sign(payload);
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return false;
  const [payloadB64, signature] = token.split(".");
  const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  const expectedSignature = sign(payload);
  const sigBuffer = Buffer.from(signature || "");
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  const [, expiresAt] = payload.split(".");
  return Number(expiresAt) > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};
