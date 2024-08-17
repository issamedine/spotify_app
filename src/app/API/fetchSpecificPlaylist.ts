const fetchPlaylistById = async (playlistId: string, token: string) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching playlist:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const playlist = await response.json();
    return playlist;
  } catch (error) {
    console.error("Failed to fetch playlist:", error);
    throw error; // Re-throw the error after logging it
  }
};

// Example usage:
export const fetchSpecificPlaylist = async (query: string, token: string) => {
  if (!token) {
    throw new Error("Access token is missing");
  }

  try {
    const playlist = await fetchPlaylistById(query, token);
    console.log("🚀 ~ fetchSpecificPlaylist ~ playlist:", playlist);
    return playlist;
  } catch (error) {
    console.error("Failed to fetch specific playlist:", error);
    throw error; // Re-throw the error after logging it
  }
};
