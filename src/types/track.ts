export interface TrackProps {
  item: any;
  handleTrackClick: (uri: string) => void;
  currentTrackUri: string | null;
}
