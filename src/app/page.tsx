"use client";

import styles from "./homepage.module.scss";
import Home from "./home/page";


const HomePage: React.FC = () => {

  return (
    <main className={styles.container_body}>
      <Home />
    </main>
  );
};

export default HomePage;
