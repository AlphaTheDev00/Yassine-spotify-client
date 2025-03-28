import api from "../utils/api.js";

const PLAYLISTS_ENDPOINT = "/api/playlists";

// Get all playlists for the current user
export async function getUserPlaylists() {
  try {
    const res = await api.get(PLAYLISTS_ENDPOINT);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get a single playlist by ID
export async function getPlaylist(id) {
  try {
    const res = await api.get(`${PLAYLISTS_ENDPOINT}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Create a new playlist
export async function createPlaylist(playlistData) {
  try {
    const res = await api.post(PLAYLISTS_ENDPOINT, playlistData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Add a song to a playlist
export async function addSongToPlaylist(playlistId, songId) {
  try {
    const res = await api.post(
      `${PLAYLISTS_ENDPOINT}/${playlistId}/songs`,
      { songId }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Remove a song from a playlist
export async function removeSongFromPlaylist(playlistId, songId) {
  try {
    const res = await api.delete(
      `${PLAYLISTS_ENDPOINT}/${playlistId}/songs/${songId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
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
