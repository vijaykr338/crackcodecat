import jwt from "jsonwebtoken";

interface DecodedUser {
  email: string;
  name: string;
  userId: string;
  role: "ADMIN" | "USER";
}

export function decodeUserFromCookieClient(): DecodedUser | null {
  try {
    const match = document.cookie.match(/(?:^|; )user=([^;]*)/);
    if (!match) return null;

    const token = decodeURIComponent(match[1]);
    const decoded = jwt.decode(token) as DecodedUser | null;

    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
