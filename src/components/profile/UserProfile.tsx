'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function UserProfile() {
  const { data: session } = useSession();

  async function fetchSpotifyData() {
    if (!session?.accessToken) return;

    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Spotify data');
    }

    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    if (session) {
      fetchSpotifyData();
    }
  }, [session]);

  return <div>Check the console for Spotify data!</div>;
}
