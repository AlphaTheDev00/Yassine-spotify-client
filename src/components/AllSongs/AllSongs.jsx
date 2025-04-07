import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useToast,
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import {
  addToLikedSongs,
  removeFromLikedSongs,
} from "../../services/likedSongsService";
import { getAllSongs } from "../../services/songService";
import { getSmartSongImage } from "../../services/smartPictureService";
import api from "../../utils/api";
import styles from "./AllSongs.module.css";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log("Fetching songs from API...");
        setLoading(true);
        const songsData = await getAllSongs();
        console.log("Fetched Songs:", songsData);

        // Ensure we always have an array of songs
        if (Array.isArray(songsData)) {
          setSongs(songsData);
        } else {
          console.warn("Unexpected data format from getAllSongs, using empty array");
          setSongs([]);
        }
        
        setError(null);
      } catch (error) {
        console.error("Error in fetchSongs:", error);
        setError("Failed to load songs. Please try again later.");
        // Set empty array to prevent UI errors
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (!user) return;
      try {
        console.log("Fetching liked songs...");
        const response = await api.get("/.netlify/functions/api/users/liked-songs");
        console.log("Liked songs response:", response);

        if (response?.data?.songs) {
          const likedSongsIds = new Set(
            response.data.songs.map((song) => song._id)
          );
          setLikedSongs(likedSongsIds);
        }
      } catch (err) {
        console.error("Error fetching liked songs:", err);
        // Don't redirect on 401 errors for liked songs
        if (err.response?.status === 401) {
          setLikedSongs(new Set());
        }
      }
    };

    fetchLikedSongs();
  }, [user]);

  const handleLikeToggle = async (e, songId) => {
    e.preventDefault(); // Prevent navigation to song details
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like songs",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (likedSongs.has(songId)) {
        await removeFromLikedSongs(songId);
        setLikedSongs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(songId);
          return newSet;
        });
        toast({
          title: "Song removed from liked songs",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await addToLikedSongs(songId);
        setLikedSongs((prev) => new Set([...prev, songId]));
        toast({
          title: "Song added to liked songs",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading songs...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="solid" borderRadius="md" m={4}>
        <AlertIcon />
        <Text>Error: {error}</Text>
      </Alert>
    );
  }

  return (
    <div className={styles.songsContainer}>
      <h2 className={styles.heading}>All Songs</h2>
      {songs.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text>No songs available</Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            {user ? "Try creating a new song!" : "Log in to create songs!"}
          </Text>
        </Box>
      ) : (
        <div className={styles.songGrid}>
          {songs.map((song) => (
            <div key={song._id} className={styles.songCard}>
              <Link
                to={`/songs/${song._id}`}
                className={styles.songCardContent}
              >
                <img
                  src={getSmartSongImage(song, 300, 300)}
                  alt={song.title}
                  className={styles.songImage}
                />
                <div className={styles.songInfo}>
                  <h3 className={styles.songTitle}>{song.title}</h3>
                  <p className={styles.artistName}>
                    {song.artist?.username || "Unknown Artist"}
                  </p>
                </div>
              </Link>
              {user && (
                <button
                  className={styles.likeButton}
                  onClick={(e) => handleLikeToggle(e, song._id)}
                >
                  {likedSongs.has(song._id) ? (
                    <FaHeart className={styles.heartIcon} color="#1ed760" />
                  ) : (
                    <FaRegHeart className={styles.heartIcon} />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSongs;
