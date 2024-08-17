"use client";

import React from "react";
import styles from "./search.module.scss";
import BrowseAll from "@/components/(body)/browse-all";
import { useAppState } from "@/context/MyContext";
import SearchResult from "@/components/(body)/SearchResult";

function SearchPage() {
  const { searchBar } = useAppState();

  return (
    <div className={styles.container_search}>
      {searchBar.length > 0 ? <SearchResult /> : <BrowseAll />}
    </div>
  );
}

export default SearchPage;
