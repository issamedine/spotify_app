"use client";

import useRefreshToken from '@/hooks/useRefreshToken';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const { query } = router as { query?: any }; 
  console.log("🚀 ~ HomePage ~ code:", query.code)
  useRefreshToken(query.code as string);

  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      {query.code ? (
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
