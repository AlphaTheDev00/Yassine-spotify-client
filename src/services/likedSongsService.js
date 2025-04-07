import api from "../utils/api.js";

const LIKED_SONGS_ENDPOINT = "/api/liked-songs";

// Helper function to validate response format
const validateResponse = (response) => {
  if (!response || !response.data) {
    throw new Error("Invalid response format from API: No data received");
  }
  if (typeof response.data !== "object") {
    throw new Error(
      "Invalid response format from API: Response data is not an object"
    );
  }
  return response;
};

export async function getLikedSongs() {
  try {
    const response = await api.get(LIKED_SONGS_ENDPOINT);
    validateResponse(response);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
}

export async function addToLikedSongs(songId) {
  try {
    const response = await api.post(LIKED_SONGS_ENDPOINT, { songId });
    validateResponse(response);
    return response.data.data;
  } catch (error) {
    console.error("Error adding song to liked songs:", error);
    throw error;
  }
}

export async function removeFromLikedSongs(songId) {
  try {
    const response = await api.delete(`${LIKED_SONGS_ENDPOINT}/${songId}`);
    validateResponse(response);
    return response.data.data;
  } catch (error) {
    console.error("Error removing song from liked songs:", error);
    throw error;
  }
}
