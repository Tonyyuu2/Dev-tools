import axios from "axios";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  searchKey,
  setSearchKey,
  token,
  setTracks,
}) {
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
    <div className={styles.searchForm}>
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
          <button className={styles.btn} type={"reset"}>
            Clear
          </button>
          <button className={styles.btn} type={"submit"}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}