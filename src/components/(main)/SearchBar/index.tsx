import { authorize, logoutSpotify } from "@/app/API/authorize";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./searchbar.module.scss";
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  useRefreshToken(code as string);

  const [accessToken, setAccessToken] = useState<string | null>("");

  useEffect(() => {
    if (window !== undefined) {
      const codeVerifier = sessionStorage.getItem("code_verifier");
      setAccessToken(codeVerifier);
    }
  }, [accessToken, code]);

  return (
    <div className={styles.container_searchbar}>
      <div className={styles.search_input}>
        <input type="text" name="search" placeholder="What do you know to listen to ?" />
        <IoIosSearch />
      </div>
      <div className={styles.auth_btn}>
        {accessToken === "undefined" || accessToken === null ? (
          <button onClick={() => authorize()}>Sign in</button>
        ) : (
          <button onClick={() => logoutSpotify()}>Sign out</button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
