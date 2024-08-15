import { getToken, refreshSpotifyToken } from "@/app/API/authorize";
import { useEffect, useState } from "react";

export default function useRefreshToken(code: string) {
  const [expiresIn, setExpiresIn] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const fetchToken = async () => {
    try {
      const response = await getToken(code);
      setRefreshToken(response.refresh_token);
      setAccessToken(response.access_token);
      setExpiresIn(response.expires_in);

      // Store the access_token in sessionStorage
      sessionStorage.setItem("access_token", response.access_token);
    } catch (error) {
      console.error("Failed to fetch token:", error);
    }
  };

  const refreshTokenFn = async () => {
    try {
      const response = await refreshSpotifyToken(refreshToken);
      setAccessToken(response.access_token);
      setExpiresIn(response.expires_in);

      // Update the access_token in sessionStorage
      sessionStorage.setItem("access_token", response.access_token);
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    if (code) {
      fetchToken();
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      refreshTokenFn();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
