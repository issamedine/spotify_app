"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "@/app/API/fetchPlaylists";
import styles from "./playlist-display.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Playlist } from "@/types/playlist";
import { stripHTML } from "@/helpers/deleteHTML";
import { useEffect, useState } from "react";

const fetchPlaylistsData = async (type: string, token: string) => {
  return fetchPlaylists(type, token);
};

const PlaylistDisplay: React.FC = () => {
  const [showAllFocus, setShowAllFocus] = useState<Boolean>(false);
  const [showAllPlaylist, setShowAllPlaylist] = useState<Boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        setToken(token);
      }
    };

    checkToken(); // Check immediately
    const intervalId = setInterval(checkToken, 1000); // Check every second
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  // Fetch focus playlists
  const { data: focusPlaylists = [], error: focusPlaylistsError } = useQuery({
    queryKey: ["focusPlaylists", token],
    queryFn: () => fetchPlaylistsData("Focus", token!),
    enabled: !!token, // Only run query if token is available
  });

  // Fetch spotify playlists
  const { data: spotifyPlaylists = [], error: spotifyPlaylistsError } =
    useQuery({
      queryKey: ["spotifyPlaylists", token],
      queryFn: () => fetchPlaylistsData("Spotify Playlist", token!),
      enabled: !!token, // Only run query if token is available
    });

  if (focusPlaylistsError || spotifyPlaylistsError) {
    return <div>Error fetching playlists</div>;
  }

  return (
    <div className={styles.container_playlist_display}>
      <div className={styles.header_show_list}>
        <div className={styles.header_show_list_title}>Focus</div>
        <div
          className={styles.show_btn}
          onClick={() => setShowAllFocus(!showAllFocus)}
        >
          {showAllFocus ? "Show less" : "Show all"}
        </div>
      </div>
      <div className={styles.wrapper_playlist}>
        {focusPlaylists.map((playlist: any, index: any) => {
          if (!showAllFocus && index > 4) return null;
          return (
            <Link
              key={playlist.id}
              className={styles.item_playlist}
              href={`/${playlist.id}`}
            >
              {playlist.images[0] && (
                <div className={styles.image_wrapper}>
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className={styles.infos_item}>
                <div className={styles.infos_item_name}>{playlist.name}</div>
                <div className={styles.infos_item_description}>
                  {stripHTML(playlist.description)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles.header_show_list}>
        <div className={styles.header_show_list_title}>Spotify playlist</div>
        <div
          className={styles.show_btn}
          onClick={() => setShowAllPlaylist(!showAllPlaylist)}
        >
          {showAllPlaylist ? "Show less" : "Show all"}
        </div>
      </div>
      <div className={styles.wrapper_playlist}>
        {spotifyPlaylists.map((playlist: any, index: any) => {
          if (!showAllPlaylist && index > 4) return null;
          return (
            <Link
              key={playlist.id}
              className={styles.item_playlist}
              href={`/${playlist.id}`}
            >
              {playlist.images[0] && (
                <div className={styles.image_wrapper}>
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className={styles.infos_item}>
                <div className={styles.infos_item_name}>{playlist.name}</div>
                <div className={styles.infos_item_description}>
                  {stripHTML(playlist.description)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistDisplay;
