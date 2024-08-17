import SpotifyEmbed from "@/components/SpotifyEmbed";
import React from "react";
import styles from "./playtrack.module.scss";

function PlayTrack() {
  return (
    <div className={styles.container_play_track}>
      <SpotifyEmbed embedUrl="" />
    </div>
  );
}

export default PlayTrack;
