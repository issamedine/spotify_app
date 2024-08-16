export const fetchPlaylists = async (query: string, token: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=playlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await response.json();
  return data.playlists.items;
};
