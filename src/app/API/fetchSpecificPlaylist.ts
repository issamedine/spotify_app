const fetchPlaylistById = async (playlistId: string, token: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }

  const playlist = await response.json();
  return playlist;
};

// Example usage:
export const fetchSpecificPlaylist = async (id: string) => {
  const token = sessionStorage.getItem("access_token"); // Ensure the token is stored correctly
  if (!token) {
    throw new Error("Access token is missing");
  }

  const response = await fetchPlaylistById(id, token);

//   const data = await response.json();
  console.log("🚀 ~ fetchSpecificPlaylist ~ data:", response)
  return response;
};
