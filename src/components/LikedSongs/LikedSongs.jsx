import { useState, useEffect, useCallback } from "react";
import { getLikedSongs, removeFromLikedSongs } from "../../services/likedSongsService";
import { useToast } from "@chakra-ui/react";
import styles from "./LikedSongs.module.css";
import smartPictureService from "../../services/smartPictureService";

export default function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const loadLikedSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      const songs = await getLikedSongs();
      console.log("Liked songs data:", songs);
      setLikedSongs(songs || []);
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

  async function handleUnlikeSong(songId) {
    try {
      await removeFromLikedSongs(songId);
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
    // Check all possible image field names
    if (song.cover_image && song.cover_image !== "") {
      return song.cover_image;
    }
    if (song.cover_Image && song.cover_Image !== "") {
      return song.cover_Image;
    }
    if (song.imageUrl && song.imageUrl !== "") {
      return song.imageUrl;
    }
    if (song.image_url && song.image_url !== "") {
      return song.image_url;
    }
    
    // If no image found, use smart picture service
    return smartPictureService.getSmartSongImage(song, 300, 300);
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
              <img
                src={getSongImage(song)}
                alt={song.title}
                className={styles.songCover}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = smartPictureService.getRandomMusicImage(300, 300);
                }}
              />
              <div className={styles.songInfo}>
                <h3 className={styles.songTitle}>{song.title}</h3>
                <p className={styles.artistName}>{song.user_id?.username || "Unknown Artist"}</p>
              </div>
              <div className={styles.songActions}>
                <button
                  className={styles.unlikeButton}
                  onClick={() => handleUnlikeSong(song._id)}
                >
                  &hearts;
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
