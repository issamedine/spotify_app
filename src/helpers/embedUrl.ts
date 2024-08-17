export const getEmbedUrl = (currentTrackUri: string | null) =>
  currentTrackUri
    ? `https://open.spotify.com/embed/track/${currentTrackUri.split(":").pop()}`
    : "";
