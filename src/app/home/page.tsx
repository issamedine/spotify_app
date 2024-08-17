import React from "react";
import styles from './home.module.scss'
import PlaylistDisplay from "@/components/(body)/home/PlaylistDisplay";

function Home() {
  return (
    <div className={styles.container_home}>
      <PlaylistDisplay />
    </div>
  );
}

export default Home;
