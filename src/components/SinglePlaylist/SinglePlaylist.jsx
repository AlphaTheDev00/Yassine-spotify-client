import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPlaylist,
  removeSongFromPlaylist,
} from "../../services/playlistService";
import { useToast } from "@chakra-ui/react";
import styles from "./SinglePlaylist.module.css";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  async function loadPlaylist() {
    try {
      setIsLoading(true);
      const data = await getPlaylist(id);
      setPlaylist(data);
    } catch (error) {
      toast({
        title: "Error loading playlist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveSong(songId) {
    try {
      await removeSongFromPlaylist(id, songId);
      setPlaylist({
        ...playlist,
        songs: playlist.songs.filter((song) => song._id !== songId),
      });
      toast({
        title: "Song removed from playlist",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error removing song",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className={styles.errorContainer}>Playlist not found</div>;
  }

  return (
    <div className={styles.playlistContainer}>
      <div className={styles.playlistHeader}>
        <img
          src={
            playlist.cover_image ||
            "https://res.cloudinary.com/df2de4wvd/image/upload/v1622222222/default_playlist_cover.jpg"
          }
          alt={playlist.name}
          className={styles.playlistCover}
        />
        <div className={styles.playlistInfo}>
          <h1 className={styles.playlistName}>{playlist.name}</h1>
          <p className={styles.songCount}>
            {playlist.songs.length}{" "}
            {playlist.songs.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </div>

      {playlist.songs.length === 0 ? (
        <div className={styles.emptyState}>
          <p>This playlist is empty.</p>
          <p>Add songs to your playlist to see them here!</p>
        </div>
      ) : (
        <div className={styles.songsList}>
          {playlist.songs.map((song) => (
            <div key={song._id} className={styles.songItem}>
              <img
                src={song.cover_image}
                alt={song.title}
                className={styles.songCover}
              />
              <div className={styles.songInfo}>
                <h3 className={styles.songTitle}>{song.title}</h3>
                <p className={styles.artistName}>{song.user_id.username}</p>
              </div>
              <div className={styles.songActions}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveSong(song._id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
