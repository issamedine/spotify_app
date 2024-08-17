import { authorize, logoutSpotify } from "@/app/API/authorize";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./searchbar.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useAppState } from "@/context/MyContext";

function SearchSpotify() {
  const router = useRouter();
  const pathname = usePathname();

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

  const { searchBar, setSearchBar } = useAppState();

  // Debounce function with TypeScript
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search handler
  if (searchBar.length > 0)
    router.push("/search");
  const handleChangeSearch = useCallback(
    /**
     *TODO
     */
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

export default function SearchBar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchSpotify />
    </Suspense>
  );
}
