import { useQuery } from "@tanstack/react-query";
import { searchSpotify } from "@/app/API/searchSpotify";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useAppState } from "@/context/MyContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const fetchSearchResults = async (token: string, query: string) => {
  const data = await searchSpotify(token, query, "track,playlist");
  return data.tracks.items;
};

const SpotifySearch: React.FC = () => {
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  const { searchBar } = useAppState();

  const token = sessionStorage.getItem("access_token");

  const { data: tracks = [], error } = useQuery({
    queryKey: ["spotifySearch", searchBar],
    queryFn: () => {
      if (token && searchBar) {
        return fetchSearchResults(token, searchBar);
      }
      return [];
    },
    enabled: !!token && !!searchBar, // Only run query if token and searchBar are available
  });

  const embedUrl = currentTrackUri
    ? `https://open.spotify.com/embed/track/${currentTrackUri.split(":").pop()}`
    : "";

  const handleTrackClick = (uri: string) => {
    setCurrentTrackUri(uri);
  };

  if (error) {
    return <div>Error fetching search results</div>;
  }

  return (
    <div>
      <div>
        {tracks.length > 0 ? (
          <ul>
            {tracks.map((track: any) => (
              <li
                onClick={() => handleTrackClick(track.uri)}
                key={track.id}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  width="50"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <p>{track.name}</p>
                  <p>
                    {track.artists.map((artist: any) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
      <SpotifyEmbed embedUrl={embedUrl} />
    </div>
  );
};

export default SpotifySearch;
