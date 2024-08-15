// /src/components/PlaybackControls.tsx

import { useState } from "react";

const PlaybackControls = ({ player }: { player: any }) => {
  const [trackUri, setTrackUri] = useState<string | null>(null);

  const handlePlay = () => {
    if (player && trackUri) {
      player._options.getOAuthToken((accessToken: string) => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`,
          {
            method: "PUT",
            body: JSON.stringify({ uris: [trackUri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      });
    }
  };

  const handlePause = () => {
    if (player) {
      player.pause();
    }
  };

  const handleResume = () => {
    if (player) {
      player.resume();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Track URI"
        onChange={(e) => setTrackUri(e.target.value)}
      />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleResume}>Resume</button>
    </div>
  );
};

export default PlaybackControls;
