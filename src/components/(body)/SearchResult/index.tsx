import { useQuery } from "@tanstack/react-query";
import { searchSpotify } from "@/app/API/searchSpotify";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useAppState } from "@/context/MyContext";
import { useEffect, useState } from "react";
import Track from "@/components/ui/track";
import { getEmbedUrl } from "@/helpers/embedUrl";
import LoadingUI from "@/components/ui/loading";
import ErrorUI from "@/components/ui/error";

const fetchSearchResults = async (token: string, query: string) => {
  const data = await searchSpotify(token, query, "track,playlist");
  return data.tracks.items;
};

const SpotifySearch: React.FC = () => {
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  const { searchBar } = useAppState();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser-only code
      const storedToken = sessionStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  const {
    data: tracks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spotifySearch", searchBar],
    queryFn: () => {
      if (token && searchBar) {
        return fetchSearchResults(token, searchBar);
      }
      return [];
    },
    enabled: !!token && !!searchBar, // Only run query if token and searchBar are available
  });

  const embedUrl = getEmbedUrl(currentTrackUri);

  const handleTrackClick = (uri: string) => {
    setCurrentTrackUri(uri);
  };

  if (isLoading) {
    return <LoadingUI />;
  }

  if (error) {
    return <ErrorUI />;
  }

  return (
    <div>
      <div>
        {tracks.length > 0 ? (
          <ul>
            {tracks.map((track: any) => {
              const item = {
                track: {
                  uri: track.uri,
                  id: track.id,
                  name: track.name,
                  artists: track.artists,
                  album: {
                    images: [{ url: track.album.images[0].url }],
                  },
                },
              };
              return (
                <Track
                  item={item}
                  handleTrackClick={handleTrackClick}
                  currentTrackUri={currentTrackUri}
                />
              );
            })}
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
