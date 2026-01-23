// pages/api/instamojo/accesstoken.js

import { NextResponse } from "next/server";
import { getInstamojoAccessToken } from "@/lib/insta_token"

export async function GET() {
  try {
    const accessToken = await getInstamojoAccessToken();
    return NextResponse.json({ access_token: accessToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
}