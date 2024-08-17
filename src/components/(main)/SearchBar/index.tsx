import { authorize, logoutSpotify } from "@/app/API/authorize";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./searchbar.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useAppState } from "@/context/MyContext";

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

  const { setSearchBar } = useAppState();

  // Debounce function with TypeScript
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search handler
  const handleChangeSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchBar(e.target.value);
    }, 3000), // 500ms delay
    []
  );

  return (
    <div className={styles.container_searchbar}>
      <div className={styles.search_input}>
        <input
          type="text"
          name="search"
          placeholder="What do you know to listen to ?"
          onChange={(e) => handleChangeSearch(e)}
        />
        <IoIosSearch />
      </div>
      <div className={styles.auth_btn}>
        {accessToken === "undefined" || accessToken === null ? (
          <button
            onClick={() => {
              authorize();
              console.log("gooo");
            }}
          >
            Sign in
          </button>
        ) : (
          <button onClick={() => logoutSpotify()}>Sign out</button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
