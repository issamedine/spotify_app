import React, { useEffect, useRef } from 'react';

const SpotifyPlayer: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (window.Spotify) {
      const player = new window.Spotify.Player({
        name: 'My Spotify Player',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
      playerRef.current = player;
    }
  }, [accessToken]);

  return null; // or your player UI
};

export default SpotifyPlayer;
