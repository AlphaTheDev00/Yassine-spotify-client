import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Image, 
  SimpleGrid, 
  IconButton, 
  useToast,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { getPlaylist, addSongToPlaylist } from "../../services/playlistService";
import { getAllSongs } from "../../services/songService";
import { getSmartSongImage } from "../../services/smartPictureService";
import { useAuth } from "../../hooks/useAuth";
import { getLikedSongIds, toggleLikedSong } from "../../utils/localLikedSongs";
import styles from "./PlaylistDetail.module.css";

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  
  const [playlist, setPlaylist] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [showAddSongs, setShowAddSongs] = useState(false);
  
  // Fetch playlist data
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const response = await getPlaylist(id);
        console.log("Playlist response:", response);
        
        if (response && response.data) {
          setPlaylist(response.data);
        } else {
          toast({
            title: "Error",
            description: "Playlist not found",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/playlists");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        toast({
          title: "Error",
          description: "Failed to load playlist. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/playlists");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlaylist();
    }
  }, [id, navigate, toast]);

  // Fetch all songs for adding to playlist
  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const songs = await getAllSongs();
        setAllSongs(songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    if (showAddSongs) {
      fetchAllSongs();
    }
  }, [showAddSongs]);

  // Load liked songs from localStorage
  useEffect(() => {
    if (user) {
      try {
        const likedSongsIds = getLikedSongIds();
        setLikedSongs(likedSongsIds);
      } catch (err) {
        console.error("Error loading liked songs from localStorage:", err);
        setLikedSongs(new Set());
      }
    }
  }, [user]);

  const handleLikeToggle = (e, songId) => {
    e.preventDefault();
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
      // Use local storage to toggle liked status
      const isLiked = toggleLikedSong(songId);
      
      // Update UI state
      setLikedSongs(prev => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.add(songId);
        } else {
          newSet.delete(songId);
        }
        return newSet;
      });
      
      toast({
        title: isLiked ? "Song added to liked songs" : "Song removed from liked songs",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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

  const handleAddToPlaylist = async (song) => {
    try {
      const response = await addSongToPlaylist(id, song);
      console.log("Add to playlist response:", response);
      
      if (response && (response.data || response.success)) {
        // Update the playlist with the new song
        setPlaylist(prev => {
          if (!prev) return prev;
          
          // Check if song is already in playlist
          const songExists = prev.songs?.some(s => s._id === song._id);
          if (songExists) {
            toast({
              title: "Song already in playlist",
              status: "info",
              duration: 2000,
              isClosable: true,
            });
            return prev;
          }
          
          // Add song to playlist
          return {
            ...prev,
            songs: [...(prev.songs || []), song]
          };
        });
        
        toast({
          title: "Success",
          description: `Added "${song.title}" to playlist`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to add song to playlist");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast({
        title: "Error",
        description: "Failed to add song to playlist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveFromPlaylist = (songId) => {
    // For now, just update the UI (we'll implement the actual API call later)
    setPlaylist(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        songs: prev.songs?.filter(song => song._id !== songId) || []
      };
    });
    
    toast({
      title: "Song removed from playlist",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!user) {
    return (
      <Box textAlign="center" py={10} className={styles.container}>
        <Heading as="h1" size="xl" mb={6}>
          Playlist Details
        </Heading>
        <Text fontSize="lg">
          Please <Link to="/login" className={styles.link}>log in</Link> to view playlists
        </Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" py={10} className={styles.container}>
        <Spinner size="xl" />
        <Text mt={4}>Loading playlist...</Text>
      </Box>
    );
  }

  if (!playlist) {
    return (
      <Box textAlign="center" py={10} className={styles.container}>
        <Heading as="h1" size="xl" mb={6}>
          Playlist Not Found
        </Heading>
        <Text fontSize="lg" mb={4}>
          The playlist you're looking for doesn't exist or you don't have permission to view it.
        </Text>
        <Button as={Link} to="/playlists" colorScheme="green">
          Back to My Playlists
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Flex 
        direction={{ base: "column", md: "row" }} 
        mb={8}
        gap={6}
        className={styles.header}
      >
        <Image
          src={playlist.coverImage || "https://via.placeholder.com/300x300?text=Playlist"}
          alt={playlist.name}
          borderRadius="lg"
          className={styles.playlistImage}
        />
        
        <Box flex="1">
          <Heading as="h1" size="xl" mb={2}>
            {playlist.name}
          </Heading>
          <Text fontSize="lg" mb={4}>
            Created by {playlist.username || user.username}
          </Text>
          <Text mb={4}>
            {playlist.songs?.length || 0} songs
          </Text>
          
          <Flex gap={4} wrap="wrap">
            <Button
              leftIcon={<FaPlay />}
              colorScheme="green"
              isDisabled={!playlist.songs?.length}
            >
              Play
            </Button>
            <Button
              leftIcon={<AddIcon />}
              onClick={() => setShowAddSongs(!showAddSongs)}
            >
              {showAddSongs ? "Hide Songs" : "Add Songs"}
            </Button>
          </Flex>
        </Box>
      </Flex>

      {showAddSongs && (
        <Box mb={8} className={styles.addSongsSection}>
          <Heading as="h2" size="lg" mb={4}>
            Add Songs to Playlist
          </Heading>
          
          {allSongs.length === 0 ? (
            <Text>No songs available to add</Text>
          ) : (
            <Table variant="simple" className={styles.songsTable}>
              <Thead>
                <Tr>
                  <Th>Song</Th>
                  <Th>Artist</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allSongs.map(song => (
                  <Tr key={song._id}>
                    <Td>
                      <Flex align="center" gap={3}>
                        <Image
                          src={getSmartSongImage(song, 40, 40)}
                          alt={song.title}
                          boxSize="40px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <Text>{song.title}</Text>
                      </Flex>
                    </Td>
                    <Td>{song.artist || "Unknown Artist"}</Td>
                    <Td>
                      <Button
                        size="sm"
                        leftIcon={<AddIcon />}
                        onClick={() => handleAddToPlaylist(song)}
                      >
                        Add
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      )}

      <Box className={styles.playlistSongs}>
        <Heading as="h2" size="lg" mb={4}>
          Songs in Playlist
        </Heading>
        
        {!playlist.songs?.length ? (
          <Box textAlign="center" py={6} className={styles.emptyState}>
            <Text fontSize="lg" mb={3}>
              This playlist is empty
            </Text>
            <Text>
              Add songs to your playlist to start listening
            </Text>
          </Box>
        ) : (
          <Table variant="simple" className={styles.songsTable}>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Artist</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {playlist.songs.map((song, index) => (
                <Tr key={song._id} className={styles.songRow}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Image
                        src={getSmartSongImage(song, 40, 40)}
                        alt={song.title}
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Link to={`/songs/${song._id}`}>
                        {song.title}
                      </Link>
                    </Flex>
                  </Td>
                  <Td>{song.artist || "Unknown Artist"}</Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        icon={likedSongs.has(song._id) ? <FaHeart /> : <FaRegHeart />}
                        aria-label={likedSongs.has(song._id) ? "Unlike" : "Like"}
                        variant="ghost"
                        colorScheme={likedSongs.has(song._id) ? "green" : "gray"}
                        onClick={(e) => handleLikeToggle(e, song._id)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Remove from playlist"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveFromPlaylist(song._id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetail;
