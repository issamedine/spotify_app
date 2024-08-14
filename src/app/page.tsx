"use client";

import useRefreshToken from "@/hooks/useRefreshToken";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getToken, logoutSpotify } from "./API/authorize";

const MyComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "Not provided";
  useRefreshToken(code as string);

  const [accessToken, setAccessToken] = useState("");
  console.log("🚀 ~ accessToken:", accessToken)

  const fetchToken = async () => {
    let response = await getToken(code);
    setAccessToken(response.access_token);
  };

  useEffect(() => {
    fetchToken();
  }, [code]);

  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      {accessToken ? (
        <Link href="/signin">Sign in with Spotify</Link>
      ) : (
        <div>
          <p>Signed in as </p>
          <button onClick={() => logoutSpotify()}>Sign out</button>
        </div>
      )}
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
