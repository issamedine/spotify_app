"use client";

import useRefreshToken from '@/hooks/useRefreshToken';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from "next/navigation";

export default function HomePage() {
  const router = usePathname();
  // const { query } = router as { query?: any }; 
  console.log("🚀 ~ HomePage ~ code:", router)
  // useRefreshToken(query.code as string);

  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      {router ? (
        <div>
          <p>Signed in as </p>
          <button>Sign out</button>
        </div>
      ) : (
        <a href="/signin">Sign in with Spotify</a>
      )}
    </div>
  );
}
