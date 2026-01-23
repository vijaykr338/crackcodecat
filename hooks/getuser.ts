"use client";

import { decodeUserFromCookieClient } from "@/utils/decoder";
import { useState, useEffect } from "react";

interface User {
  userId: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const decoded = decodeUserFromCookieClient();
      if (decoded) {
        setUser(decoded);
      }
    } catch (e) {
      console.error("Failed to decode user:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
}
