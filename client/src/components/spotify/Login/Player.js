import SpotifyPlayer from "react-spotify-web-playback"
import SearchBar from './SearchBar';
import { useEffect, useState} from "react";
import Login from "./Login";


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
    <div>
      <SpotifyPlayer
      token={token}
      showSaveIcon
      autoPlay
      // callback={state => !state.isPlaying && setPlay(false)}
      play={isPlaying}
      uris={trackUri}
      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        height: "55px",
      }}
    />

      <SearchBar setSearchKey={setSearchKey} token={token} searchKey={searchKey} tracks={tracks} setTracks={setTracks} />

      <div>{tracks.length > 0 ? (
        tracks?.map((track, index)=>{
          return (
          <div key={track.index}>    
            <p style={{cursor:"pointer"}}key={track.index} id={track.uri} onClick={()=>{
              playMusic(track)}}>{track.name}
            </p> 
          </div>
          )
        })
      ) : (<h3>no track found</h3>)
      }
    
      </div>
    </div>

  )
}





