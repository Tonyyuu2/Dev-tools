
import styles from "./Login.module.css";
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Player from "./Player";
import { FaSpotify } from 'react-icons/fa';

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientID = "ca1fd06082824f4ea552edf9ad5f195d"
const redirectUri = "http://localhost:3000"
const scopes = ["user-read-private", "user-modify-playback-state", "user-read-playback-state", "user-library-read", "streaming", "user-read-email", "user-library-modify"]

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;



const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/search",
});

const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function(config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default function Login() {

  const [token, setToken] = useState("");


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (

    <div className={styles.loginPage}>
      <a className={styles.loginBtn}  href={loginEndpoint}>
        <span className={styles.loginTxt}>
          LOG IN 
        </span>
      </a>
      <p style={{textAlign: "center", marginTop: "12px"}}>Please Login to Use Spotify</p>
      <FaSpotify className={styles.spotify_logo} />
    </div> 
  ) : (
   <div >
    <Player token={token} />
  </div>
  )

}


