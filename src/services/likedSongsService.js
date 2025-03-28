import api from "../utils/api.js";

const LIKED_SONGS_ENDPOINT = "/api/liked-songs";

export async function getLikedSongs() {
  try {
    const response = await api.get(LIKED_SONGS_ENDPOINT);
    return response.data.songs;
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
}

export async function addToLikedSongs(songId) {
  try {
    const response = await api.post(LIKED_SONGS_ENDPOINT, { songId });
    return response.data;
  } catch (error) {
    console.error("Error adding song to liked songs:", error);
    throw error;
  }
}

export async function removeFromLikedSongs(songId) {
  try {
    const response = await api.delete(`${LIKED_SONGS_ENDPOINT}/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing song from liked songs:", error);
    throw error;
  }
}
