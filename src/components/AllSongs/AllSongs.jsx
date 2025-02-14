import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import styles from "./AllSongs.module.css";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/songs");
        console.log("Fetched Songs:", response.data);
        setSongs(response.data.allSongs);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.songsContainer}>
      <h2 className={styles.heading}>All Songs</h2>
      {songs.length === 0 ? (
        <p>No songs available</p>
      ) : (
        <div className={styles.songGrid}>
          {songs.map((song) => {
            return (
              <Link
                to={`/songs/${song._id}`}
                key={song._id}
                className={styles.songCardLink}
              >
                <div className={styles.songCard}>
                  <img
                    src={
                      song.cover_image && song.cover_image.trim() !== ""
                        ? song.cover_image
                        : "https://picsum.photos/200"
                    }
                    alt={song.title || "Song Cover"}
                    className={styles.songCover}
                  />
                  <div className={styles.songInfo}>
                    {/* Top title */}
                    <h3 className={styles.songTopTitle}>{song.title}</h3>
                    {/* Animated title */}
                    {/* <h3 className={styles.songTitle}>{song.title}</h3> */}
                    {/* <p className={styles.artistName}>
                      {song.user_id?.username
                        ? song.user_id.username
                        : "Unknown Artist"}
                    </p> */}
                    <p className={styles.createdBy}>
                      Created by{" "}
                      <span>{song.user_id?.username || "Unknown"}</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllSongs;
