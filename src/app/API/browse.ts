import {
  SpotifyCategoriesResponse,
  SpotifyCategory,
  SpotifyPlaylist,
} from "@/types/category";

export async function getSpotifyCategories(
  token: string | null
): Promise<SpotifyCategory[]> {
  const response = await fetch(
    "https://api.spotify.com/v1/browse/categories?country=US&locale=en_US",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify categories");
  }

  const data: SpotifyCategoriesResponse = await response.json();
  return data.categories.items;
}

export const getCategoryPlaylists = async (
  token: string | null,
  categoryId: string
): Promise<SpotifyPlaylist[]> => {
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category playlists");
  }

  const data = await response.json();
  return data.playlists.items;
};
