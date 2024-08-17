export interface PlaylistImage {
  url: string;
  height?: number;
  width?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: PlaylistImage[];
}
