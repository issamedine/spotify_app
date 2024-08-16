'use client';

import React, { useEffect } from "react";
import { fetchSpecificPlaylist } from "../API/fetchSpecificPlaylist";
import styles from './specific-playlist.module.scss'

interface PageProps {
  params: {
    idPlaylist: string;
  };
}

const SpecificPlaylist: React.FC<PageProps> = ({ params }) => {
  useEffect(() => {
    fetchSpecificPlaylist(params.idPlaylist);
  }, [params.idPlaylist]);

  return <div className={styles.container_specific_playlist}>spacific {params.idPlaylist}</div>;
};

export default SpecificPlaylist;
