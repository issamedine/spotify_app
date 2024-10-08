const SPOTIFY_CLIENT_ID = `3738206533f14da59d6fed4e32c0c314`;
const REDIRECTURI = "https://spotify-app-eight-xi.vercel.app/";
// const REDIRECTURI = "http://localhost:3000/";

function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  function base64encode(string: Uint8Array): string {
    return btoa(String.fromCharCode.apply(null, Array.from(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(new Uint8Array(digest));
}

const codeVerifier: string = generateRandomString(128);

let urlParams = new URLSearchParams();

if (typeof window !== "undefined") {
  urlParams = new URLSearchParams(window.location.search);
}

// eslint-disable-next-line @typescript-eslint/require-await
export const authorize = async () => {
  void generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    const scope = [
      "user-read-private",
      "user-read-email",
      "streaming",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-recently-played",   // Added for recently played tracks
      "playlist-read-private",        // Added for accessing playlists
    ].join(" ");
    const state: string = generateRandomString(16);

    sessionStorage.setItem("code_verifier", codeVerifier);

    const args = new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,  // Updated scope
      redirect_uri: REDIRECTURI,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = "https://accounts.spotify.com/authorize?" + args;
  });
};


export const getToken = async (code: string) => {
  const codeVerifier = sessionStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECTURI,
    client_id: SPOTIFY_CLIENT_ID,
    code_verifier: codeVerifier ?? "",
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),  // Convert URLSearchParams to string
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Token request error:", errorResponse);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch token error:", error);
    window.location.href = "/";
  }
};


export const refreshSpotifyToken = async (refresh_token: string) => {
  const body = new URLSearchParams({
    grant_type: "refresh_token" || "",
    refresh_token: refresh_token,
    client_id: SPOTIFY_CLIENT_ID || "",
  });
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const logoutSpotify = () => {
  // Clear any stored tokens
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("code_verifier");

  // Redirect to Spotify logout and then to your app's home page
  // const logoutUrl =
  //   "https://accounts.spotify.com/en/logout?continue=https://spotify-app-eight-xi.vercel.app/";
  window.location.href = '/';
};

