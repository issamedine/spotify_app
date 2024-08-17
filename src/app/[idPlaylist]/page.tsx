"use client";

import React, { useEffect, useState } from "react";
import { fetchSpecificPlaylist } from "../API/fetchSpecificPlaylist";
import styles from "./specific-playlist.module.scss";
import SpotifyEmbed from "@/components/SpotifyEmbed";

const stripHTML = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

type Artist = {
  name: string;
};

type Track = {
  id: string;
  name: string;
  artists: Artist[];
};

type PlaylistTrack = {
  track: Track;
};

type PlaylistImage = {
  url: string;
};

type Playlist = {
  name: string;
  description: string;
  images: PlaylistImage[];
  tracks: {
    items: PlaylistTrack[];
  };
};

const PlaylistDisplay: React.FC<{ params: any }> = ({ params }) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        const fetchedPlaylist = await fetchSpecificPlaylist(
          params.idPlaylist,
          token
        );
        setPlaylist(fetchedPlaylist);
      }
    };

    fetchPlaylistData();
  }, [params.idPlaylist]);

  if (!playlist) {
    return <div>Loading...</div>;
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
          <li key={item.track.id} onClick={() => handleTrackClick(item.track.uri)}>
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
