"use client";

import { getCategoryPlaylists, getSpotifyCategories } from "@/app/API/browse";
import { SpotifyCategory, SpotifyPlaylist } from "@/types/category";
import { useEffect, useState } from "react";
import styles from "./specific-category.module.scss";
import Link from "next/link";

const CategoryPlaylist: React.FC = ({ params }: any) => {
  const [categories, setCategories] = useState<SpotifyCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SpotifyCategory | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = sessionStorage.getItem("access_token");

      try {
        const token = sessionStorage.getItem("access_token");
        const fetchedPlaylists = await getCategoryPlaylists(
          token,
          params.idCategory
        );
        setPlaylists(fetchedPlaylists);
      } catch (err) {
        console.error("Error fetching category playlists:", err);
        setError("Failed to fetch playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container_specific_category}>
      <div>
        <h2>Playlists for </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {playlists.map((playlist) => (
              <Link href={`/${playlist.id}`} key={playlist.id}>
                <h3>{playlist.name}</h3>
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width="100"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPlaylist;
