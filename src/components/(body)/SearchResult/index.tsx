import { searchSpotify } from "@/app/API/searchSpotify";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useAppState } from "@/context/MyContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const SpotifySearch: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  console.log("🚀 ~ tracks:", tracks)
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  const { searchBar } = useAppState();

  useEffect(() => {
    const fetchSearchSpotify = async () => {
      const token = sessionStorage.getItem("access_token");
      if (token && searchBar) {
        try {
          const data = await searchSpotify(token, searchBar, "track,playlist");
          setTracks(data.tracks.items);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchSpotify();
  }, [searchBar]);

  const embedUrl = currentTrackUri
    ? `https://open.spotify.com/embed/track/${currentTrackUri.split(":").pop()}`
    : "";

  const handleTrackClick = (uri: string) => {
    setCurrentTrackUri(uri);
  };

  return (
    <div>
      <div>
        {tracks.length > 0 ? (
          <ul>
            {tracks.map((track) => (
              <li
                onClick={() => handleTrackClick(track.uri)}
                key={track.id}
              >
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  width="50"
                />
                <p>{track.name}</p>
                <p>
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
      {<SpotifyEmbed embedUrl={embedUrl} />}
    </div>
  );
};

export default SpotifySearch;
