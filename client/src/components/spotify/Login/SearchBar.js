
import axios from 'axios';
import './SearchBar.css'

export default function SearchBar({ searchKey, setSearchKey, token,
setTracks, tracks }){

  const searchTracks = async (e) => {
    
    setTracks([]);
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setTracks(data.tracks.items);
  };


  return (
    <div className="search-form">
      <form onSubmit={searchTracks}>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
           setSearchKey(e.target.value);
          }}
        />
        <button type={"submit"}>Search</button>
        <button type={"reset"}>Clear</button>
      </form>
      {/* {renderResults()} */}
    </div>
   )
  }
  







    {/* </div>
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.track?.name}</p>
              <p>0:30</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  ); */}

