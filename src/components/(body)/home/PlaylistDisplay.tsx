'use client';

import { fetchPlaylists } from "@/app/API/fetchPlaylists";
import { useEffect, useState } from "react";
import styles from "./playlist-display.module.scss";
import Image from "next/image";
import { fetchSpecificPlaylist } from "@/app/API/fetchSpecificPlaylist";
import Link from "next/link";
import { Playlist } from "@/types/playlist";
import { stripHTML } from "@/helpers/deleteHTML";

const PlaylistDisplay: React.FC = () => {
  const [focusPlaylists, setFocusPlaylists] = useState<Playlist[]>([]);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<Playlist[]>([]);
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

  useEffect(() => {
    const fetchPlaylistsData = async () => {
      if (token) {
        try {
          const focusPlaylists = await fetchPlaylists("Focus", token);
          const spotifyPlaylists = await fetchPlaylists(
            "Spotify Playlist",
            token
          );
          setFocusPlaylists([...focusPlaylists]);
          setSpotifyPlaylists([...spotifyPlaylists]);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      }
    };

    fetchPlaylistsData();
  }, [token]); // Re-fetch when token is available

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
        {focusPlaylists.map((playlist, index) => {
          if (!showAllFocus && index > 4) return;
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
        {spotifyPlaylists.map((playlist, index) => {
          if (!showAllPlaylist && index > 4) return;
          return (
            <div key={playlist.id} className={styles.item_playlist}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistDisplay;
