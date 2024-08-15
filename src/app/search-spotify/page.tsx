"use client";

import { useState } from "react";
import { searchSpotify } from "../API/searchSpotify";

const SearchSpotifyView = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const accessToken = sessionStorage.getItem("access_token"); // Ensure this is available

  const handleSearch = async () => {
    if (!query || !accessToken) return;

    const data = await searchSpotify(accessToken, query, "track,playlist"); // Adjust the type as needed
    setResults(data);
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
