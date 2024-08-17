import React from "react";
import styles from "./track.module.scss";
import { FaPlay } from "react-icons/fa6";
import Image from "next/image";
import { TrackProps } from "@/types/track";


const Track: React.FC<TrackProps> = ({
  item,
  handleTrackClick,
  currentTrackUri,
}) => {
  return (
    <div
      className={`${styles.container_track} ${
        currentTrackUri === item.track?.uri ? styles.played : ""
      }`}
      key={item.track?.id}
      onClick={() => handleTrackClick(item.track?.uri)}
    >
      <div className={styles.track_info}>
        {/* Display track image */}
        {item.track?.album?.images?.[0]?.url && (
          <Image
            width={50}
            height={50}
            src={item.track.album.images[0].url}
            alt={item.track.name}
            className={styles.track_image}
          />
        )}
        <div className={styles.track_details}>
          <div>{item.track?.name}</div>
          <div>
            by{" "}
            {item.track?.artists.map((artist: any) => artist.name).join(", ")}
          </div>
        </div>
      </div>
      <FaPlay />
    </div>
  );
};

export default Track;
