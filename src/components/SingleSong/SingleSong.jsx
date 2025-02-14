import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getToken } from "../../utils/auth";
import { useAuth } from "../../contexts/UserContext";
import styles from "./SingleSong.module.css";
import { relatedSongs, songDelete, songShow } from "../../services/songService";

const SingleSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [song, setSong] = useState(null);
  const [userSongs, setUserSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const data = await songShow(id);
        setSong(data);

        const relatedSongsList = await relatedSongs(data.user_id._id)
        setUserSongs(relatedSongsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  useEffect(() => {
    const audioElement = document.getElementById("audio-player");
    if (audioElement) {
      audioElement.load();
    }
  }, [song]);

  const handleDelete = () => {
    setShowModal(true); // Show the modal
  };

  const confirmDelete = async () => {
    setShowModal(false); // Close modal
    const token = getToken();
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    if (!song || !song._id) {
      console.error("⚠️ Song ID is missing!", song);
      alert("Error: Missing song ID. Please refresh the page.");
      return;
    }

    try {
      await songDelete(song._id);
      navigate("/");
    } catch (error) {
      alert(
        `Error deleting the song: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!song || !song.title) return <p>⚠️ No song found for this ID.</p>;

  return (
    <div className={styles["single-song-container"]}>
      <div className={styles["song-card"]}>
        <h2 className={styles["song-title"]}>{song.title}</h2>
        <img
          src={song.cover_image || "https://picsum.photos/500/500"}
          alt={song.title}
          className={styles["song-cover"]}
        />
        <div className={styles["song-details"]}>
          <p className={styles["uploaded-by"]}>
            Uploaded by:{" "}
            <span className={styles["username"]}>
              {song.user_id?.username || "Unknown"}
            </span>
          </p>
          <p className={styles["song-date"]}>
            Added on: {new Date(song.createdAt).toDateString()}
          </p>
        </div>
        <audio
          id="audio-player"
          controls
          className={styles["audio-player"]}
          controlsList="nodownload"
        >
          <source src={song.audio_url} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {user && user._id === song.user_id?._id && (
          <div className={styles["song-actions"]}>
            <Link
              to={`/songs/${id}/update`}
              className={styles["update-button"]}
            >
              Update
            </Link>
            <button onClick={handleDelete} className={styles["delete-button"]}>
              Delete
            </button>
          </div>
        )}
      </div>

      {userSongs.length > 0 && (
        <div className={styles["other-songs-container"]}>
          <h3 className={styles["more-from-title"]}>
            More from{" "}
            <span className={styles["more-from-username"]}>
              {song.user_id?.username}
            </span>
          </h3>
          <div className={styles["other-songs-list"]}>
            {userSongs.map((otherSong) => (
              <Link
                to={`/songs/${otherSong._id}`}
                key={otherSong._id}
                className={styles["other-song-card"]}
              >
                <img
                  src={otherSong.cover_image || "https://picsum.photos/200"}
                  alt={otherSong.title}
                  className={styles["other-song-cover"]}
                />
                <p className={styles["other-song-title"]}>{otherSong.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <p>Are you sure you want to delete this song?</p>
            <button className={styles["confirm-btn"]} onClick={confirmDelete}>
              Yes, Delete
            </button>
            <button
              className={styles["cancel-btn"]}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSong;
