import React, { Suspense } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { AiOutlineSpotify } from "react-icons/ai";
import { IoHomeOutline, IoLibraryOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiAddBoxFill } from "react-icons/ri";
import { BiSolidHeartSquare } from "react-icons/bi";
import { useAppState } from "@/context/MyContext";
import { TbWorld } from "react-icons/tb";
import { useRouter, usePathname } from "next/navigation";

function MyComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const { searchBar, setSearchBar } = useAppState();

  const goTo = (direction: string) => {
    setSearchBar("");
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
              className={`${pathname === "/home" ? styles.item_active : ""}`}
              onClick={() => goTo("home")}
            >
              <IoHomeOutline />
              <span>Home</span>
            </div>
            <div
              className={`${
                pathname === "/search" || pathname.includes("specific-category")
                  ? styles.item_active
                  : ""
              }`}
              onClick={() => goTo("search")}
            >
              <CiSearch />
              <span>Search</span>
            </div>
            <div
              className={`${pathname === "/library" ? styles.item_active : ""}`}
              onClick={() => goTo("library")}
            >
              <IoLibraryOutline />
              <span>Your Library</span>
            </div>
          </div>

          <div className={styles.items}>
            <div
              className={`${pathname === "/create" ? styles.item_active : ""}`}
            >
              <RiAddBoxFill />
              <span>Create Playlist</span>
            </div>
            <div
              className={`${pathname === "/liked" ? styles.item_active : ""}`}
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

export default function NavBar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
