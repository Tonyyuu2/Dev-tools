import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Button} from "react-bootstrap"
import axios from "axios"
export default function Login() {
  const client_id = "4d5982510464422bb28ac87e062a5065"
  const redirect_uri = "http://localhost:3000/"
  const auth_endpoint = "https://accounts.spotify.com/authorize"
  const response_type = "token"
  
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  
  useEffect (() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash) {
      token = hash.substring(1).split("&").find(ele => ele.startsWith("access_token")).split("=")[1]
    }
    setToken(token)
  },[])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token")
  }



  const searchArtists = async (e)=> {
    e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers:{
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
      
    })
    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artists => (
      <div key={artists.id}>
        {artists.images.length ? <img width={"200px"} src={artists.images[0].url} alt=""/> : <div>No images</div>}
        {artists.name}
      </div>
    ))
  }

  return (
    <div className='d-flex justify-content-center'>
      <header>Spotify Login Page
      {!token ?
     <a href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`}>Login</a> : <button onClick={logout}>Logout</button>
      }
      {token ?

      <form onSubmit={searchArtists}>
          <input type="text" name="search" id="search" onChange={(e)=> {setSearchKey(e.target.value)}} />
          <Button type={"submit"}>
            Search
          </Button>
      </form>
      : <h2>Please Login</h2>
      }

      {renderArtists()}

      </header>
    </div>
  )
}
