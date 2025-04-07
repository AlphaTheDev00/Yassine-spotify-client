import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaPlay, FaTrash } from "react-icons/fa";
import { getLikedSongIds, removeLikedSong } from "../../utils/localLikedSongs";
import { getAllSongs } from "../../services/songService";
import { getSmartSongImage } from "../../services/smartPictureService";
import styles from "./LikedSongs.module.css";

export default function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const loadLikedSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get all songs first
      const allSongs = await getAllSongs();
      console.log("All songs data:", allSongs);
      
      // Get liked song IDs from localStorage
      const likedSongIds = getLikedSongIds();
      console.log("Liked song IDs:", likedSongIds);
      
      // Filter all songs to get only the liked ones
      const likedSongsData = allSongs.filter(song => likedSongIds.has(song._id));
      console.log("Filtered liked songs:", likedSongsData);
      
      setLikedSongs(likedSongsData || []);
    } catch (err) {
      console.error("Error loading liked songs:", err);
      toast({
        title: "Error loading liked songs",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadLikedSongs();
  }, [loadLikedSongs]);

  function handleUnlikeSong(songId) {
    try {
      // Use local storage to remove the song
      removeLikedSong(songId);
      setLikedSongs(likedSongs.filter((song) => song._id !== songId));
      toast({
        title: "Song removed from liked songs",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error removing song",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  // Get song image with fallback to smart picture service
  const getSongImage = (song) => {
    // Use the getSmartSongImage utility function
    return getSmartSongImage(song, 300, 300);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.likedSongsContainer}>
      <h1 className={styles.heading}>Liked Songs</h1>
      <div className={styles.songsList}>
        {likedSongs.length === 0 ? (
          <div className={styles.emptyState}>
            <p>You haven&rsquo;t liked any songs yet.</p>
            <p>Start exploring and like songs to find them here!</p>
          </div>
        ) : (
          likedSongs.map((song) => (
            <div key={song._id} className={styles.songItem}>
              <Link to={`/songs/${song._id}`} className={styles.songLink}>
                <img
                  src={getSongImage(song)}
                  alt={song.title}
                  className={styles.songCover}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/seed/" + song._id + "/300/300";
                  }}
                />
                <div className={styles.songInfo}>
                  <h3 className={styles.songTitle}>{song.title}</h3>
                  <p className={styles.artistName}>{song.user_id?.username || "Unknown Artist"}</p>
                </div>
              </Link>
              <div className={styles.songActions}>
                <Link to={`/songs/${song._id}`} className={styles.playButton}>
                  <FaPlay />
                </Link>
                <button
                  className={styles.unlikeButton}
                  onClick={() => handleUnlikeSong(song._id)}
                  title="Remove from liked songs"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
