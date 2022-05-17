import SpotifyPlayer from "react-spotify-web-playback"
import SearchBar from './SearchBar';
import { useEffect, useState} from "react";
import Login from "./Login";
import styles from './Player.module.css'


export default function Player({token}) {

  const [searchKey, setSearchKey] = useState("")
  const [tracks, setTracks] = useState([])
  const [trackUri, setTrackUri] = useState("")
  const [isPlaying, setIsplaying] = useState(false)


  useEffect(()=>{
    tracks.map(item => {
      setTrackUri(item.uri)
    })
  },[])
 
  const playMusic = (track) => {
      setTrackUri(track.uri)
      setIsplaying(true);
  }

  return !token ? (
    <Login />
  ) : ( 
    <div className={styles.spotifyContainer}>
      <div className= {styles.spotifyPlayer}>
        <SpotifyPlayer
            token={token}
            autoPlay
            play={isPlaying}
            uris={trackUri}
            magnifySliderOnHover={true}
            volume= {0.6}
            styles={{
              activeColor: "#fff",
              bgColor: "#b6ded3",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "lightblue",
              trackArtistColor: "#fff",
              trackNameColor: "#fff",
              height: "55px",
              sliderTrackBorderRadius: "25px",
              loaderSize: "20px"
            }}
            locale={{
              next: "next",
              pause: "pause",
              title: "long"
            }}
          />
         </div> 
      <div className={styles.spotifyContainer}>
      <div className={styles.resultContainer}>{tracks.length > 0 ? (
        tracks?.map((track)=>{
          return (
          <div key={track.index}>    
            <div className={styles.searchResult} style={{cursor:"pointer"}}key={track.index} id={track.uri} onClick={()=>{
              playMusic(track)}}>
                <div><img src={track.album.images[0].url} alt={`${track.name}image`}className={styles.albumImage} height={"50px"}/></div>
                <div>{track.name}</div>
            </div> 
          </div>
          )
        })
      )
      : (<h3 style={{textAlign: 'center', marginTop: "20px", marginBottom: "20px"}}>Play some tunes 🎶</h3>)
      }
      </div>
      <SearchBar setSearchKey={setSearchKey} token={token} searchKey={searchKey} tracks={tracks} setTracks={setTracks} />
    </div>
    </div>
  )
}





