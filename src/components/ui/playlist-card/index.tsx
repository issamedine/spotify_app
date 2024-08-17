import { stripHTML } from "@/helpers/deleteHTML";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from './playlist-card.module.scss'

const PlaylistCard = ({ playlist }: any) => {
  return (
    <Link
      key={playlist.id}
      className={styles.container_card_playlist}
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
};

export default PlaylistCard;
