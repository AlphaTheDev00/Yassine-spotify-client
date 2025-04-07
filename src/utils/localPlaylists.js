/**
 * Utility functions for managing playlists in localStorage
 * This provides a client-side fallback when the API is not available
 */

const LOCAL_STORAGE_KEY = 'spotify_clone_playlists';

/**
 * Get all playlists from localStorage
 * @returns {Array} Array of playlist objects
 */
export const getPlaylists = () => {
  try {
    const storedPlaylists = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedPlaylists) {
      return [];
    }
    return JSON.parse(storedPlaylists);
  } catch (error) {
    console.error('Error getting playlists from localStorage:', error);
    return [];
  }
};

/**
 * Get a single playlist by ID
 * @param {string} playlistId - The ID of the playlist to get
 * @returns {Object|null} The playlist object or null if not found
 */
export const getPlaylistById = (playlistId) => {
  try {
    const playlists = getPlaylists();
    return playlists.find(playlist => playlist.id === playlistId) || null;
  } catch (error) {
    console.error('Error getting playlist by ID from localStorage:', error);
    return null;
  }
};

/**
 * Create a new playlist
 * @param {Object} playlist - The playlist object to create
 * @returns {Object} The created playlist object
 */
export const createPlaylist = (playlist) => {
  try {
    const playlists = getPlaylists();
    
    // Generate a unique ID if not provided
    if (!playlist.id) {
      playlist.id = 'playlist_' + Date.now();
    }
    
    // Add creation date if not provided
    if (!playlist.createdAt) {
      playlist.createdAt = new Date().toISOString();
    }
    
    // Initialize songs array if not provided
    if (!playlist.songs) {
      playlist.songs = [];
    }
    
    const newPlaylists = [...playlists, playlist];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPlaylists));
    return playlist;
  } catch (error) {
    console.error('Error creating playlist in localStorage:', error);
    throw error;
  }
};

/**
 * Update an existing playlist
 * @param {string} playlistId - The ID of the playlist to update
 * @param {Object} updates - The updates to apply to the playlist
 * @returns {Object|null} The updated playlist object or null if not found
 */
export const updatePlaylist = (playlistId, updates) => {
  try {
    const playlists = getPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);
    
    if (playlistIndex === -1) {
      console.error(`Playlist with ID ${playlistId} not found`);
      return null;
    }
    
    // Create updated playlist
    const updatedPlaylist = {
      ...playlists[playlistIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Replace the playlist in the array
    const updatedPlaylists = [
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1)
    ];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPlaylists));
    return updatedPlaylist;
  } catch (error) {
    console.error('Error updating playlist in localStorage:', error);
    throw error;
  }
};

/**
 * Delete a playlist
 * @param {string} playlistId - The ID of the playlist to delete
 * @returns {boolean} True if the playlist was deleted, false otherwise
 */
export const deletePlaylist = (playlistId) => {
  try {
    const playlists = getPlaylists();
    const filteredPlaylists = playlists.filter(p => p.id !== playlistId);
    
    if (filteredPlaylists.length === playlists.length) {
      // No playlist was removed
      return false;
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredPlaylists));
    return true;
  } catch (error) {
    console.error('Error deleting playlist from localStorage:', error);
    throw error;
  }
};

/**
 * Add a song to a playlist
 * @param {string} playlistId - The ID of the playlist
 * @param {Object} song - The song object to add
 * @returns {Object|null} The updated playlist or null if not found
 */
export const addSongToPlaylist = (playlistId, song) => {
  try {
    const playlist = getPlaylistById(playlistId);
    if (!playlist) {
      return null;
    }
    
    // Check if song already exists in playlist
    const songExists = playlist.songs.some(s => s._id === song._id);
    if (songExists) {
      return playlist; // Song already in playlist, no change needed
    }
    
    // Add song to playlist
    const updatedSongs = [...playlist.songs, song];
    return updatePlaylist(playlistId, { songs: updatedSongs });
  } catch (error) {
    console.error('Error adding song to playlist in localStorage:', error);
    throw error;
  }
};

/**
 * Remove a song from a playlist
 * @param {string} playlistId - The ID of the playlist
 * @param {string} songId - The ID of the song to remove
 * @returns {Object|null} The updated playlist or null if not found
 */
export const removeSongFromPlaylist = (playlistId, songId) => {
  try {
    const playlist = getPlaylistById(playlistId);
    if (!playlist) {
      return null;
    }
    
    // Remove song from playlist
    const updatedSongs = playlist.songs.filter(s => s._id !== songId);
    return updatePlaylist(playlistId, { songs: updatedSongs });
  } catch (error) {
    console.error('Error removing song from playlist in localStorage:', error);
    throw error;
  }
};
