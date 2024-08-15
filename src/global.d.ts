// global.d.ts
export {};

declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
      }) => {
        connect: () => void;
        addListener: (event: string, cb: (data: any) => void) => void;
        pause: () => void;
        resume: () => void;
        // add other methods and properties as needed
      };
    };
  }
}
