"use client";

import { useState, useEffect } from "react";
import { searchSpotify } from "../API/searchSpotify";

const SearchSpotifyView = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Retrieve the access token only on the client side
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  const handleSearch = async () => {
    if (!query || !accessToken) return;

    const data = await searchSpotify(accessToken, query, "track,playlist"); // Adjust the type as neededsetResults(data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks or playlists"
      />
      <button onClick={handleSearch}>Search</button>

      {results && (
        <div>
          <h3>Tracks:</h3>
          <ul>
            {results.tracks.items.map((track: any) => (
              <li key={track.id}>
                {track.name} by{" "}
                {track.artists.map((artist: any) => artist.name).join(", ")}
              </li>
            ))}
          </ul>
          <h3>Playlists:</h3>
          <ul>
            {results.playlists.items.map((playlist: any) => (
              <li key={playlist.id}>
                {playlist.name} by {playlist.owner.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSpotifyView;
