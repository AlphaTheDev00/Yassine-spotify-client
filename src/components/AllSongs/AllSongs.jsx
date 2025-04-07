import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useToast,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import { getAllSongs } from "../../services/songService";
import { getLikedSongIds, toggleLikedSong, addLikedSong, removeLikedSong } from "../../utils/localLikedSongs";
import { useAuth } from "../../hooks/useAuth";
import { getSmartSongImage } from "../../services/smartPictureService";
import styles from "./AllSongs.module.css";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 15;
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
          setFilteredSongs(songsData);
        } else {
          console.warn("Unexpected data format from getAllSongs, using empty array");
          setSongs([]);
          setFilteredSongs([]);
        }
        
        setError(null);
      } catch (error) {
        console.error("Error in fetchSongs:", error);
        setError("Failed to load songs. Please try again later.");
        // Set empty array to prevent UI errors
        setSongs([]);
        setFilteredSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    // Load liked songs from localStorage instead of API
    const loadLikedSongs = () => {
      try {
        console.log("Loading liked songs from localStorage...");
        const userId = user?.id || 'guest';
        console.log("Loading liked songs for user:", userId);
        const likedSongsIds = getLikedSongIds(userId);
        console.log("Loaded liked songs:", likedSongsIds);
        setLikedSongs(likedSongsIds);
      } catch (err) {
        console.error("Error loading liked songs from localStorage:", err);
        setLikedSongs(new Set());
      }
    };

    loadLikedSongs();
  }, [user]);

  const handleLikeToggle = (e, songId) => {
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
      const userId = user?.id || 'guest';
      if (likedSongs.has(songId)) {
        // Use local storage to remove the song
        removeLikedSong(songId, userId);
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
        // Use local storage to add the song
        addLikedSong(songId, userId);
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

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSongs(songs);
      setCurrentPage(1);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = songs.filter(song => 
      song.title.toLowerCase().includes(query) || 
      (song.artist?.username && song.artist.username.toLowerCase().includes(query)) ||
      (song.user_id?.username && song.user_id.username.toLowerCase().includes(query))
    );
    
    setFilteredSongs(filtered);
    setCurrentPage(1);
  }, [searchQuery, songs]);

  // Calculate pagination
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
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
      
      <div className={styles.searchContainer}>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search songs by title or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            borderRadius="full"
            bg="#2a2a2a"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _hover={{ bg: '#333' }}
            _focus={{ bg: '#333', borderColor: '#1db954' }}
          />
        </InputGroup>
      </div>
      
      {filteredSongs.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text>No songs available</Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            {user ? "Try creating a new song!" : "Log in to create songs!"}
          </Text>
        </Box>
      ) : (
        <div className={styles.songGrid}>
          {currentSongs.map((song) => (
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
      
      {/* Pagination controls */}
      {filteredSongs.length > songsPerPage && (
        <Flex justifyContent="center" mt={6} mb={4} className={styles.pagination}>
          <Button 
            onClick={goToPreviousPage} 
            isDisabled={currentPage === 1}
            mr={2}
            leftIcon={<FaChevronLeft />}
            bg="#2a2a2a"
            color="white"
            _hover={{ bg: '#1db954' }}
          >
            Previous
          </Button>
          <Text alignSelf="center" mx={4} color="white">
            Page {currentPage} of {totalPages}
          </Text>
          <Button 
            onClick={goToNextPage} 
            isDisabled={currentPage === totalPages}
            ml={2}
            rightIcon={<FaChevronRight />}
            bg="#2a2a2a"
            color="white"
            _hover={{ bg: '#1db954' }}
          >
            Next
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default AllSongs;
