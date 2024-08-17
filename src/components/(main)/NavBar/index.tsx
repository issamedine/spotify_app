import React from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { AiOutlineSpotify } from "react-icons/ai";
import { IoHomeOutline, IoLibraryOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiAddBoxFill } from "react-icons/ri";
import { BiSolidHeartSquare } from "react-icons/bi";
import { useAppState } from "@/context/MyContext";
import { TbWorld } from "react-icons/tb";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  const {
    navbarActive,
    setNavbarActive,
    searchBar,
    setSearchBar,
    playTrack,
    setPlayTrack,
  } = useAppState();

  const goTo = (direction: string) => {
    setNavbarActive(direction);
    router.push(`/${direction}`);
  };

  return (
    <div className={styles.container_navbar}>
      <div className={styles.logo}>
        <AiOutlineSpotify />
        <span>Spotify</span>
      </div>
      <div className={styles.content_nav}>
        <div className={styles.first_section}>
          <div className={styles.items}>
            <div
              className={`${navbarActive === "home" ? styles.item_active : ""}`}
              onClick={() => goTo("home")}
            >
              <IoHomeOutline />
              <span>Home</span>
            </div>
            <div
              className={`${
                navbarActive === "search" ? styles.item_active : ""
              }`}
              onClick={() => goTo("search")}
            >
              <CiSearch />
              <span>Search</span>
            </div>
            <div
              className={`${
                navbarActive === "library" ? styles.item_active : ""
              }`}
              onClick={() => goTo("library")}
            >
              <IoLibraryOutline />
              <span>Your Library</span>
            </div>
          </div>

          <div className={styles.items}>
            <div
              className={`${
                navbarActive === "create" ? styles.item_active : ""
              }`}
            >
              <RiAddBoxFill />
              <span>Create Playlist</span>
            </div>
            <div
              className={`${
                navbarActive === "liked" ? styles.item_active : ""
              }`}
            >
              <BiSolidHeartSquare />
              <span>Liked Songs</span>
            </div>
          </div>
        </div>

        <div className={styles.second_section}>
          <div className={styles.informations}>
            <span>Legal</span>
            <span>Privacy Center</span>
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>About Ads</span>
            <span>icon</span>
            <span>Cookies</span>
          </div>

          <div className={styles.language}>
            <TbWorld /> <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
