import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AudioPLayer from '../../components/AudioPlayer/AudioPlayer';
import SearchBar from '../../components/SearchBar/SearchBar';
import SongCard from '../../components/songCards/SongCard';
import apiClient from '../../Spotify';
import './Player.css'


export default function Player({token}) {
  const location = useLocation();
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState("track");


  const searchArtists = async (e) => {
    
    setArtists([]);
    setTracks([]);
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: category,
      },
    });
    category === 'artist'?
    setArtists(data.artists.items) :
    setTracks(data.tracks.items);
    
  };


  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
       <SearchBar 
       searchKey={searchKey}
       setSearchKey={setSearchKey}
       setTracks={setTracks}
       tracks={tracks} 
       setCurrentIndex={setCurrentIndex} 
       token={token}
       artists={artists}
       setArtists={setArtists}
       category={category}
       setCategory={setCategory}
       searchArtists={searchArtists}
       />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        {/* <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} /> */}
      </div>
    </div>
  );
}