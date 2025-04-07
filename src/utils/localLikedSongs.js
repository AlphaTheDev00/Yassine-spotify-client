/**
 * Utility functions for managing liked songs in localStorage
 * This provides a client-side fallback when the API is not available
 */

const LOCAL_STORAGE_KEY = 'spotify_clone_liked_songs';

/**
 * Get all liked song IDs from localStorage
 * @returns {Set<string>} Set of liked song IDs
 */
export const getLikedSongIds = () => {
  try {
    const storedLikedSongs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedLikedSongs) {
      return new Set();
    }
    return new Set(JSON.parse(storedLikedSongs));
  } catch (error) {
    console.error('Error getting liked songs from localStorage:', error);
    return new Set();
  }
};

/**
 * Add a song ID to liked songs in localStorage
 * @param {string} songId - The ID of the song to like
 * @returns {Set<string>} Updated set of liked song IDs
 */
export const addLikedSong = (songId) => {
  try {
    const likedSongs = getLikedSongIds();
    likedSongs.add(songId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...likedSongs]));
    return likedSongs;
  } catch (error) {
    console.error('Error adding liked song to localStorage:', error);
    return getLikedSongIds();
  }
};

/**
 * Remove a song ID from liked songs in localStorage
 * @param {string} songId - The ID of the song to unlike
 * @returns {Set<string>} Updated set of liked song IDs
 */
export const removeLikedSong = (songId) => {
  try {
    const likedSongs = getLikedSongIds();
    likedSongs.delete(songId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...likedSongs]));
    return likedSongs;
  } catch (error) {
    console.error('Error removing liked song from localStorage:', error);
    return getLikedSongIds();
  }
};

/**
 * Check if a song is liked
 * @param {string} songId - The ID of the song to check
 * @returns {boolean} True if the song is liked, false otherwise
 */
export const isSongLiked = (songId) => {
  return getLikedSongIds().has(songId);
};

/**
 * Toggle the liked status of a song
 * @param {string} songId - The ID of the song to toggle
 * @returns {boolean} New liked status (true if liked, false if unliked)
 */
export const toggleLikedSong = (songId) => {
  if (isSongLiked(songId)) {
    removeLikedSong(songId);
    return false;
  } else {
    addLikedSong(songId);
    return true;
  }
};
