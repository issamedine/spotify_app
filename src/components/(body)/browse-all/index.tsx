"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpotifyCategories } from "@/app/API/browse";
import { SpotifyCategory } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Browse All</h1>
      <div>
        {categories.map((category: SpotifyCategory) => (
          <Link href={`/specific-category/${category.id}`} key={category.id}>
            <div>
              <h2>{category.name}</h2>
              <img
                src={category.icons[0]?.url}
                alt={category.name}
                width="100"
                style={{ display: "block" }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
