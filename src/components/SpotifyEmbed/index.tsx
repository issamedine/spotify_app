import React from "react";
import styles from './spotify-embed.module.scss'

interface SpotifyEmbedProps {
  embedUrl: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ embedUrl }) => {
  return (
    <div className={styles.container_spotify_embed}>
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="encrypted-media"
        allowTransparency={true}
        allowFullScreen={false}
        title="Spotify Player"
        className={`${embedUrl ? styles.iframe_exist : ''}`}
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;
