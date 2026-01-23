// lib/instamojo.js

import axios from "axios";

let cachedToken = {
  token: "",
  expiresAt: 0,
};

export async function getInstamojoAccessToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken.token && now < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  // Add a check to ensure environment variables are defined
  const clientId = process.env.INSTAMOJO_CLIENT_ID;
  const clientSecret = process.env.INSTAMOJO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Instamojo environment variables.");
  }

  try {
    console.log("env vars are");
    console.log(clientId,clientSecret);
    
    
    const response = await axios.post(
      "https://api.instamojo.com/oauth2/token/",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId, // Now guaranteed to be a string
        client_secret: clientSecret, // Now guaranteed to be a string
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    cachedToken.token = access_token;
    cachedToken.expiresAt = now + expires_in * 1000;
    console.log("acess tokem is");
    console.log(access_token);
    
    
    return access_token;
  } catch (error:any) {
    console.error("Token error", error.response?.data || error.message);
    throw new Error("Failed to get access token");
  }
}