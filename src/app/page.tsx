"use client";

import useRefreshToken from '@/hooks/useRefreshToken';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const code = router.query.code;
  console.log("🚀 ~ HomePage ~ code:", code)
  useRefreshToken(code as string);

  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      {code ? (
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
