// export const getRecentTracks = async () => {
//   const accessToken = sessionStorage.getItem("access_token");
//   try {
//     const response = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const data = await response.json();
//     return data.items
//   } catch (error) {
//     console.error("Error fetching recent tracks:", error);
//   }
// };

export const getRecentTracks = async (accessToken: string, limit: number = 50) => {
  console.log("🚀 ~ getRecentTracks ~ accessToken:", accessToken)
  const url = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.items; // Return the array of recent tracks
  } catch (error) {
    console.error("Error fetching recent tracks:", error);
    return [];
  }
};
