"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchSpecificPlaylist } from "../API/fetchSpecificPlaylist";
import styles from "./specific-playlist.module.scss";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useState } from "react";
import { Playlist } from "@/types/specificPlaylistTypes";

const stripHTML = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const PlaylistDisplay: React.FC<{ params: { idPlaylist: string } }> = ({
  params,
}) => {
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);

  const {
    data: playlist,
    error,
    isLoading,
  }: UseQueryResult<Playlist, Error> = useQuery({
    queryKey: ["playlist", params.idPlaylist],
    queryFn: async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token is missing");
      }
      return await fetchSpecificPlaylist(params.idPlaylist, token);
    },
    staleTime: 5 * 60 * 1000, // Données fraîches pendant 5 minutes
    // cacheTime: 10 * 60 * 1000, // Cache pendant 10 minutes après utilisation
    refetchOnWindowFocus: true, // Rafraîchir les données lorsque la fenêtre regagne le focus
    refetchOnReconnect: true, // Rafraîchir les données lorsque la connexion est rétablie
    retry: 3, // Réessayer jusqu'à 3 fois en cas d'échec
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!playlist) {
    return <div>No playlist found</div>;
  }

  const embedUrl = currentTrackUri
    ? `https://open.spotify.com/embed/track/${currentTrackUri.split(":").pop()}`
    : "";

  const handleTrackClick = (uri: string) => {
    setCurrentTrackUri(uri);
  };

  return (
    <div className={styles.container_specific_playlist}>
      <h2>{playlist.name}</h2>
      {playlist.images[0] && (
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          width={300}
          height={300}
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        />
      )}
      <p>{stripHTML(playlist.description)}</p>
      <ul>
        {playlist.tracks.items.map((item: any) => (
          <li
            key={item.track.id}
            onClick={() => handleTrackClick(item.track.uri)}
          >
            {item.track.name} by{" "}
            {item.track.artists.map((artist: any) => artist.name).join(", ")}
          </li>
        ))}
      </ul>

      {<SpotifyEmbed embedUrl={embedUrl} />}
    </div>
  );
};

export default PlaylistDisplay;
