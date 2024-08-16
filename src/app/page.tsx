"use client";

import { useAppState } from "@/context/MyContext";
import styles from "./homepage.module.scss";
import Home from "@/components/(body)/home";
import BrowseAll from "@/components/(body)/browse-all";
import Library from "@/components/(body)/library";

interface DisplayContent {
  home: () => JSX.Element;
  search: () => JSX.Element;
  library: () => JSX.Element;
}

const HomePage: React.FC = () => {
  const { navbarActive } = useAppState();

  const displayContent: DisplayContent = {
    home: () => <Home />,
    search: () => <BrowseAll />,
    library: () => <Library />,
  };

  return (
    <main className={styles.container_body}>
      {displayContent[navbarActive as keyof DisplayContent]()}
    </main>
  );
};

export default HomePage;
