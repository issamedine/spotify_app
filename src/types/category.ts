export interface SpotifyCategory {
  id: string;
  name: string;
  icons: Array<{
    url: string;
  }>;
}

export interface SpotifyCategoriesResponse {
  categories: {
    items: SpotifyCategory[];
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: Array<{
      url: string;
  }>;
}