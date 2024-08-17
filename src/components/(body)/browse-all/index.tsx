"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpotifyCategories } from "@/app/API/browse";
import { SpotifyCategory } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./browse-all.module.scss";
import CategoryCard from "@/components/ui/category";
import LoadingUI from "@/components/ui/loading";
import ErrorUI from "@/components/ui/error";

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

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["spotifyCategories"],
    queryFn: () => fetchCategories(token),
    enabled: !!token, // Only run query if token is available
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    // cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
  });

  if (error) {
    return <ErrorUI />;
  }

  if (isLoading) {
    return <LoadingUI />;
  }

  return (
    <div className={styles.container_browse_all}>
      <div className={styles.title}>Browse All</div>
      <div className={styles.container_categories}>
        {categories.map((category: SpotifyCategory) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
