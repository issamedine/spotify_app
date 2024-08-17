"use client";

import { getCategoryPlaylists } from "@/app/API/browse";
import { SpotifyPlaylist } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import styles from "./specific-category.module.scss";
import PlaylistCard from "@/components/ui/playlist-card";
import LoadingUI from "@/components/ui/loading";
import ErrorUI from "@/components/ui/error";

const CategoryPlaylist: React.FC<any> = ({ params }) => {
  // Use React Query's useQuery with the correct v5 object signature
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoryPlaylists", params.idCategory], // Cache key
    queryFn: async () => {
      const token = sessionStorage.getItem("access_token");
      return await getCategoryPlaylists(token, params.idCategory);
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    // cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
  });

  return (
    <div className={styles.container_specific_category}>
      <div>
        <h2>Playlists for Category</h2>
        {isLoading ? (
          <LoadingUI />
        ) : isError ? (
          <ErrorUI />
        ) : (
          <div className={styles.wrapper_playlist}>
            {data?.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPlaylist;
