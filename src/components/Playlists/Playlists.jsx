import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getUserPlaylists,
  createPlaylist,
} from "../../services/playlistService";
import { getSmartPlaylistImage } from "../../services/smartPictureService";
import { Button, Input, useToast } from "@chakra-ui/react";
import styles from "./Playlists.module.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useToast();

  const loadPlaylists = useCallback(async () => {
    try {
      const data = await getUserPlaylists();
      setPlaylists(data);
    } catch (err) {
      toast({
        title: "Error loading playlists",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);

  async function handleCreatePlaylist(e) {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      setIsCreating(true);
      await createPlaylist({ name: newPlaylistName });
      setNewPlaylistName("");
      loadPlaylists();
      toast({
        title: "Playlist created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error creating playlist",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className={styles.playlistsContainer}>
      <h1 className={styles.heading}>Your Playlists</h1>

      <div className={styles.createPlaylistForm}>
        <form onSubmit={handleCreatePlaylist}>
          <Input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className={styles.playlistInput}
          />
          <Button
            type="submit"
            isLoading={isCreating}
            className={styles.createButton}
          >
            Create Playlist
          </Button>
        </form>
      </div>

      <div className={styles.playlistGrid}>
        {playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist._id}`}
            key={playlist._id}
            className={styles.playlistCard}
          >
            <img
              src={getSmartPlaylistImage(playlist, 300, 300)}
              alt={playlist.name}
              className={styles.playlistCover}
            />
            <div className={styles.playlistInfo}>
              <h3 className={styles.playlistName}>{playlist.name}</h3>
              <p className={styles.songCount}>
                {playlist.songs.length}{" "}
                {playlist.songs.length === 1 ? "song" : "songs"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
