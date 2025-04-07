/**
 * Utility functions for managing liked songs in localStorage
 * This provides a client-side fallback when the API is not available
 * Songs are stored per user to maintain separation between different users
 */

const LOCAL_STORAGE_KEY = 'spotify_clone_liked_songs';

/**
 * Get the user-specific storage key
 * @param {string} userId - The user ID
 * @returns {string} The user-specific storage key
 */
const getUserStorageKey = (userId) => {
  return userId ? `${LOCAL_STORAGE_KEY}_${userId}` : LOCAL_STORAGE_KEY;
};

/**
 * Get all liked song IDs from localStorage for a specific user
 * @param {string} userId - The user ID (optional, defaults to 'guest')
 * @returns {Set<string>} Set of liked song IDs
 */
export const getLikedSongIds = (userId = 'guest') => {
  try {
    const userKey = getUserStorageKey(userId);
    const storedLikedSongs = localStorage.getItem(userKey);
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
 * Add a song ID to liked songs in localStorage for a specific user
 * @param {string} songId - The ID of the song to like
 * @param {string} userId - The user ID (optional, defaults to 'guest')
 * @returns {Set<string>} Updated set of liked song IDs
 */
export const addLikedSong = (songId, userId = 'guest') => {
  try {
    const likedSongs = getLikedSongIds(userId);
    likedSongs.add(songId);
    const userKey = getUserStorageKey(userId);
    localStorage.setItem(userKey, JSON.stringify([...likedSongs]));
    return likedSongs;
  } catch (error) {
    console.error('Error adding liked song to localStorage:', error);
    return getLikedSongIds(userId);
  }
};

/**
 * Remove a song ID from liked songs in localStorage for a specific user
 * @param {string} songId - The ID of the song to unlike
 * @param {string} userId - The user ID (optional, defaults to 'guest')
 * @returns {Set<string>} Updated set of liked song IDs
 */
export const removeLikedSong = (songId, userId = 'guest') => {
  try {
    const likedSongs = getLikedSongIds(userId);
    likedSongs.delete(songId);
    const userKey = getUserStorageKey(userId);
    localStorage.setItem(userKey, JSON.stringify([...likedSongs]));
    return likedSongs;
  } catch (error) {
    console.error('Error removing liked song from localStorage:', error);
    return getLikedSongIds(userId);
  }
};

/**
 * Check if a song is liked by a specific user
 * @param {string} songId - The ID of the song to check
 * @param {string} userId - The user ID (optional, defaults to 'guest')
 * @returns {boolean} True if the song is liked, false otherwise
 */
export const isSongLiked = (songId, userId = 'guest') => {
  const likedSongs = getLikedSongIds(userId);
  return likedSongs.has(songId);
};

/**
 * Toggle the liked status of a song for a specific user
 * @param {string} songId - The ID of the song to toggle
 * @param {string} userId - The user ID (optional, defaults to 'guest')
 * @returns {boolean} New liked status (true if liked, false if unliked)
 */
export const toggleLikedSong = (songId, userId = 'guest') => {
  try {
    const isLiked = isSongLiked(songId, userId);
    if (isLiked) {
      removeLikedSong(songId, userId);
      return false;
    } else {
      addLikedSong(songId, userId);
      return true;
    }
  } catch (error) {
    console.error('Error toggling liked song in localStorage:', error);
    return isSongLiked(songId, userId);
  }
};
