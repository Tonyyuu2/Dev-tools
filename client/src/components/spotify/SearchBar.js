import axios from "axios";
import styles from "./SearchBar.module.css";
import {FiDelete, FiSearch} from "react-icons/fi"

export default function SearchBar({
  searchKey,
  setSearchKey,
  token,
  setTracks,
}) {
  // Setting a selected 
  const searchTracks = async (e) => {
    setTracks([]);
    e.preventDefault();

    // Fetch track music library from spotify 
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {

    // send token for authorization request
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
    <div className={styles.searchForm}>
      {/* Serach bar */}
      <form onSubmit={searchTracks}>
        <input
          className={styles.searchInput}
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <div className={styles.buttonContainer}>
          {/* Clear search bar */}
          <button className={styles.btn} type={"reset"}>
          <FiDelete/>
          </button>
          {/* submit the search input */}
          <button className={styles.btn} type={"submit"}>
          <FiSearch/>
          </button>
        </div>
      </form>
    </div>
  );
}