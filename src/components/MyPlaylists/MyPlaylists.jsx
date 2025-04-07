import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast, Box, Heading, Text, Button, Flex, Input, SimpleGrid, Card, CardBody, Image, Stack, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { getUserPlaylists, createPlaylist } from "../../services/playlistService";
import { useAuth } from "../../hooks/useAuth";
import styles from "./MyPlaylists.module.css";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await getUserPlaylists();
        console.log("Playlists response:", response);
        
        if (response && response.data) {
          setPlaylists(response.data);
        } else {
          setPlaylists([]);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
        toast({
          title: "Error",
          description: "Failed to load playlists. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setPlaylists([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPlaylists();
    } else {
      setPlaylists([]);
      setLoading(false);
    }
  }, [user, toast]);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to create playlists",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!newPlaylistName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a playlist name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await createPlaylist({
        name: newPlaylistName,
        userId: user.id,
        username: user.username
      });
      
      console.log("Create playlist response:", response);
      
      if (response && (response.data || response.success)) {
        const newPlaylist = response.data;
        setPlaylists([...playlists, newPlaylist]);
        setNewPlaylistName("");
        toast({
          title: "Success",
          description: "Playlist created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast({
        title: "Error",
        description: "Failed to create playlist. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!user) {
    return (
      <Box textAlign="center" py={10} className={styles.container}>
        <Heading as="h1" size="xl" mb={6}>
          My Playlists
        </Heading>
        <Text fontSize="lg">
          Please <Link to="/login" className={styles.link}>log in</Link> to view your playlists
        </Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" py={10} className={styles.container}>
        <Heading as="h1" size="xl" mb={6}>
          My Playlists
        </Heading>
        <Text>Loading playlists...</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Heading as="h1" size="xl" mb={6}>
        My Playlists
      </Heading>

      <Box mb={8}>
        <form onSubmit={handleCreatePlaylist}>
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <Input
              placeholder="New playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              isDisabled={isCreating}
              className={styles.input}
            />
            <Button
              type="submit"
              leftIcon={<AddIcon />}
              isLoading={isCreating}
              loadingText="Creating"
              colorScheme="green"
              className={styles.createButton}
            >
              Create Playlist
            </Button>
          </Flex>
        </form>
      </Box>

      {playlists.length === 0 ? (
        <Box textAlign="center" py={6} className={styles.emptyState}>
          <Text fontSize="lg" mb={3}>
            You don't have any playlists yet
          </Text>
          <Text>
            Create your first playlist to start organizing your music
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {playlists.map((playlist) => (
            <Card key={playlist.id} className={styles.playlistCard}>
              <CardBody>
                <Image
                  src={playlist.coverImage || "https://via.placeholder.com/300x300?text=Playlist"}
                  alt={playlist.name}
                  borderRadius="lg"
                  className={styles.playlistImage}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{playlist.name}</Heading>
                  <Text>{playlist.songs?.length || 0} songs</Text>
                  <Flex justify="space-between">
                    <Button
                      as={Link}
                      to={`/playlists/${playlist.id}`}
                      variant="solid"
                      colorScheme="green"
                      size="sm"
                      className={styles.viewButton}
                    >
                      View
                    </Button>
                    <IconButton
                      icon={<DeleteIcon />}
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete playlist"
                      className={styles.deleteButton}
                      // Add delete functionality here
                    />
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default MyPlaylists;
