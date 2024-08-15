"use client";

import React, { useEffect, useState } from 'react';
import { getRecentTracks } from '../API/recently_played_tracks';

const RecentlyPlayedTracks = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentlyPlayedTracks = async () => {
      const token = sessionStorage.getItem('access_token'); // Ensure the token is stored correctly
      if (token) {
        const fetchedTracks = await getRecentTracks(token);
        setTracks(fetchedTracks);
      }
    };

    fetchRecentlyPlayedTracks();
  }, []);

  return (
    <div>
      <h2>Recently Played Tracks</h2>
      <ul>
        {tracks?.map((track) => (
          <li key={track.played_at}>
            {track.track.name} by {track.track.artists.map((artist: any) => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayedTracks;
