"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpotifyCategories } from "@/app/API/browse";
import { SpotifyCategory } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './browse-all.module.scss'
import CategoryCard from "@/components/ui/category";

const fetchCategories = async (token: string | null) => {
  if (!token) {
    throw new Error("No access token found");
  }
  return getSpotifyCategories(token);
};

const BrowseAll: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser-only code
      const storedToken = sessionStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  const { data: categories = [], error } = useQuery({
    queryKey: ["spotifyCategories"],
    queryFn: () => fetchCategories(token),
    enabled: !!token, // Only run query if token is available
  });

  if (error) {
    return <div>Error fetching Spotify categories</div>;
  }

  if (categories.length === 0) {
    return <div>You should connect to app</div>;
  }

  return (
    <div className={styles.container_browse_all}>
      <div className={styles.title}>Browse All</div>
      <div className={styles.container_categories}>
        {categories.map((category: SpotifyCategory) => (
          <CategoryCard category={category} />
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
