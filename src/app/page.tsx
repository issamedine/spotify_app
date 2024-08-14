"use client";

import useRefreshToken from "@/hooks/useRefreshToken";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MyComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "Not provided";
  console.log("🚀 ~ code:", code)
  useRefreshToken(code as string);
  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      <div>
        <p>Signed in as </p>
        <button>Sign out</button>
      </div>
      <Link href="/signin">Sign in with Spotify</Link>
    </div>
  );
};

export default function HomePage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
