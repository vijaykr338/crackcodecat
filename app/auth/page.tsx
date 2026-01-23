import { Suspense } from "react";
import AuthPageClient from "./auth-client";

export const dynamic = "force-dynamic";

export default function AuthPage() {
  return (
    <Suspense fallback={<p>Loading authentication form...</p>}>
      <AuthPageClient />
    </Suspense>
  );
}