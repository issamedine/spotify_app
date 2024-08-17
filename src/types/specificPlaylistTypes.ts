export type Artist = {
  name: string;
};

export type Track = {
  id: string;
  name: string;
  artists: Artist[];
};

export type PlaylistTrack = {
  track: Track;
};

export type PlaylistImage = {
  url: string;
};

export type Playlist = {
  name: string;
  description: string;
  images: PlaylistImage[];
  tracks: {
    items: PlaylistTrack[];
  };
};
