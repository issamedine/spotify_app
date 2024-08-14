"use client";

import { useSession, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome to Spotify App</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <a href="/signin">Sign in with Spotify</a>
      )}
    </div>
  );
}
