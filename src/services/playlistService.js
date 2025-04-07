import api from "../utils/api.js";
import {
  getPlaylists,
  getPlaylistById,
  createPlaylist as createLocalPlaylist,
  updatePlaylist,
  deletePlaylist as deleteLocalPlaylist,
  addSongToPlaylist as addSongToLocalPlaylist,
  removeSongFromPlaylist as removeSongFromLocalPlaylist
} from "../utils/localPlaylists.js";

// Use the Netlify function path for playlists
const PLAYLISTS_ENDPOINT = "/.netlify/functions/api/playlists";

// Get all playlists for the current user
export async function getUserPlaylists() {
  try {
    // Try to get playlists from API first
    try {
      const res = await api.get(PLAYLISTS_ENDPOINT);
      return res.data;
    } catch (apiError) {
      console.log('API error, falling back to local storage:', apiError);
      // Fall back to local storage if API fails
      return { data: getPlaylists() };
    }
  } catch (error) {
    console.log('Error getting playlists:', error);
    // Return empty array instead of throwing
    return { data: [] };
  }
}

// Get a single playlist by ID
export async function getPlaylist(id) {
  try {
    // Try to get playlist from API first
    try {
      const res = await api.get(`${PLAYLISTS_ENDPOINT}/${id}`);
      return res.data;
    } catch (apiError) {
      console.log('API error, falling back to local storage:', apiError);
      // Fall back to local storage if API fails
      const playlist = getPlaylistById(id);
      return { data: playlist };
    }
  } catch (error) {
    console.log('Error getting playlist:', error);
    // Return null instead of throwing
    return { data: null };
  }
}

// Create a new playlist
export async function createPlaylist(playlistData) {
  try {
    // Try to create playlist via API first
    try {
      const res = await api.post(PLAYLISTS_ENDPOINT, playlistData);
      return res.data;
    } catch (apiError) {
      console.log('API error, falling back to local storage:', apiError);
      // Fall back to local storage if API fails
      const playlist = createLocalPlaylist({
        ...playlistData,
        id: 'playlist_' + Date.now(),
        createdAt: new Date().toISOString(),
        songs: []
      });
      return { data: playlist, success: true };
    }
  } catch (error) {
    console.log('Error creating playlist:', error);
    throw error;
  }
}

// Add a song to a playlist
export async function addSongToPlaylist(playlistId, song) {
  try {
    // Try to add song to playlist via API first
    try {
      const res = await api.post(
        `${PLAYLISTS_ENDPOINT}/${playlistId}/songs`,
        { songId: song._id }
      );
      return res.data;
    } catch (apiError) {
      console.log('API error, falling back to local storage:', apiError);
      // Fall back to local storage if API fails
      const updatedPlaylist = addSongToLocalPlaylist(playlistId, song);
      return { data: updatedPlaylist, success: true };
    }
  } catch (error) {
    console.log('Error adding song to playlist:', error);
    throw error;
  }
}

// Remove a song from a playlist
export async function removeSongFromPlaylist(playlistId, songId) {
  try {
    // Try to remove song from playlist via API first
    try {
      const res = await api.delete(
        `${PLAYLISTS_ENDPOINT}/${playlistId}/songs/${songId}`
      );
      return res.data;
    } catch (apiError) {
      console.log('API error, falling back to local storage:', apiError);
      // Fall back to local storage if API fails
      const updatedPlaylist = removeSongFromLocalPlaylist(playlistId, songId);
      return { data: updatedPlaylist, success: true };
    }
  } catch (error) {
    console.log('Error removing song from playlist:', error);
    throw error;
  }
}

// Get user's liked songs playlist
export async function getLikedSongs() {
  try {
    const res = await api.get(`${PLAYLISTS_ENDPOINT}/liked-songs`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Like a song (add to liked songs)
export async function likeSong(songId) {
  try {
    const res = await api.post(
      `${PLAYLISTS_ENDPOINT}/liked-songs/songs`,
      { songId }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Unlike a song (remove from liked songs)
export async function unlikeSong(songId) {
  try {
    const res = await api.delete(`${PLAYLISTS_ENDPOINT}/liked-songs/songs/${songId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
