import SpotifyPlayer from "react-spotify-web-playback";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import Login from "./Login";
import styles from "./Player.module.css";

// Props token is used to direct user to login page or player
export default function Player({ token }) {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [trackUri, setTrackUri] = useState("");
  const [isPlaying, setIsplaying] = useState(false);

  // Select a track URI to play
  useEffect(() => {
    tracks.forEach((item) => {
      setTrackUri(item.uri);
    });
  }, [tracks]);

  // determine if the track is currently playing
  const playMusic = (track) => {
    setTrackUri(track.uri);
    setIsplaying(true);
  };

  //if there is no token, login page appears if there is player will appear
  return !token ? (
    <Login />
  ) : (
    <div className={styles.spotifyContainer}>
      <div className={styles.spotifyPlayer}>
        <SpotifyPlayer
          token={token}
          autoPlay
          play={isPlaying} 
          uris={trackUri}
          magnifySliderOnHover={true}
          volume={0.4} // default volume
          styles={{ // styles for player
            activeColor: "#fff",
            bgColor: "#1DB954",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "lightblue",
            trackArtistColor: "#fff",
            trackNameColor: "#fff",
            height: "55px",
            sliderTrackBorderRadius: "25px",
            loaderSize: "20px",
          }}
          locale={{
            next: "next",
            pause: "pause",
            title: "long",
          }}
        />
      </div>
      <div className={styles.spotifyContainer}>
        <div className={styles.resultContainer}>
          {tracks.length > 0 ? (
          // Display each tracks from the search results
            tracks?.map((track) => {
              return (
                <div key={track.index}>
                  <div
                    className={styles.searchResult}
                    style={{ cursor: "pointer" }}
                    key={track.index}
                    id={track.uri}
                    onClick={() => {
                      playMusic(track);
                    }}
                  >
                    <div>
                    {/*  Add Album image and title of each track */}
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name}`}
                        className={styles.albumImage}
                        height={"50px"}
                      />
                    </div>
                    <div>{track.name}</div>
                  </div>
                </div>
              );
            })
          ) : (
            // after login is successful spotify logo and search bar appears
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2880px-Spotify_logo_with_text.svg.png?20160123211747"
              className={styles.spotifyLogo}
              alt="spotifylogo"
            />
          )}
        </div>
        <SearchBar
          setSearchKey={setSearchKey}
          token={token}
          searchKey={searchKey}
          tracks={tracks}
          setTracks={setTracks}
        />
      </div>
    </div>
  );
}
