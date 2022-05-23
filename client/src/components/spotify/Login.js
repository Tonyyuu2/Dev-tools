import styles from "./Login.module.css";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Player from "./Player";
import { FaSpotify } from "react-icons/fa";

//Spotify configuration
const authEndpoint = "https://accounts.spotify.com/authorize?";
// Spotify client id
const clientID = process.env.REACT_APP_SPOTIFY;
// App url for redirect
const redirectUri = "http://localhost:3002";
// accessibility
const scopes = [
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-library-read",
  "streaming",
  "user-read-email",
  "user-library-modify",
];

// Add above variables to login endpoints.
export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/search",
});

// refresh token before it expires
const setClientToken = (spotify_token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + spotify_token;
    return config;
  });
};

export default function Login() {
  const [spotify_token, setSpotify_token] = useState("");

  // If there is no token in local storage, extract token from the url 
  // Save token to local storage 
  useEffect(() => {
    const spotify_token = window.localStorage.getItem("spotify_token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!spotify_token && hash) {
      const _spotify_token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("spotify_token", _spotify_token);
      setSpotify_token(_spotify_token);
      setClientToken(_spotify_token);
    } else {
      setSpotify_token(spotify_token);
      setClientToken(spotify_token);
    }
  }, []);

   // directing user to loginEndpoint page
  return !spotify_token ? (
    <div className={styles.loginPage}>
      <a className={styles.loginBtn} href={loginEndpoint}>
        <span className={styles.loginTxt}>LOG IN</span>
      </a>
      <p style={{ textAlign: "center", marginTop: "12px" }}>
        Please Login to Use Spotify
      </p>
      <FaSpotify className={styles.spotify_logo} />
    </div>
  ) : (
    <div>
      <Player token={spotify_token} />
    </div>
  );
}
