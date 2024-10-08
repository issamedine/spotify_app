const BASEURL = `https://api.spotify.com/v1`;

export const getTracks = async (searchQuery: string) => {
  const token = sessionStorage.getItem("access_token");
  try {
    const response = await fetch(
      `${BASEURL}/search?q=${searchQuery}&type=track,album,playlist,artist&limit=4`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getArtistTrack = async (id: string | undefined | string[]) => {
  const token = sessionStorage.getItem("access_token");
  try {
    const response = await fetch(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${BASEURL}/artists/${id}/top-tracks?market=IN`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAlbumTrack = async (id: string | undefined | string[]) => {
  const token = sessionStorage.getItem("access_token");
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await fetch(`${BASEURL}/albums/${id}/tracks?market=IN`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
