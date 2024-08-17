"use client";

import { getSpotifyCategories } from "@/app/API/browse";
import { SpotifyCategory } from "@/types/category";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomeProps {
  categories: SpotifyCategory[];
}

const BrowseAll: React.FC<any> = () => {
  const [categories, setCategories] = useState<SpotifyCategory[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = sessionStorage.getItem("access_token");

      try {
        const categories = await getSpotifyCategories(token);

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching Spotify categories:", error);
        return {
          props: {
            categories: [],
          },
        };
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Browse All</h1>
      <div>
        {categories?.map((category) => (
          <Link href={`/specific-category/${category.id}`} key={category.id}>
            <h2>{category.name}</h2>
            <img src={category.icons[0].url} alt={category.name} width="100" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
