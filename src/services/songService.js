import api from "../utils/api.js";

// Use the Netlify function path for songs
const SONGS_ENDPOINT = "/.netlify/functions/api/songs";

// Debug log to check the full URL being used
api.interceptors.request.use((request) => {
  console.log("Request URL:", request.baseURL + request.url);
  return request;
});

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

export async function getAllSongs() {
  try {
    console.log("Fetching all songs...");
    const res = await api.get(SONGS_ENDPOINT);
    console.log("All songs response:", res);

    // Handle both response formats: { data: [...] } and [...] directly
    if (res.data && Array.isArray(res.data)) {
      return res.data; // API returned array directly
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data; // API returned { data: [...] }
    } else if (res.data && res.data.data === null) {
      console.warn("API returned null data, returning empty array");
      return []; // API returned { data: null }
    } else {
      console.warn("Unexpected API response format, returning empty array:", res.data);
      return []; // Fallback to empty array for any other format
    }
  } catch (error) {
    console.error("Error fetching all songs:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Don't throw the error, return an empty array for any error
    return [];
  }
}

export async function songCreate(formData) {
  try {
    console.log("Creating new song...");
    const res = await api.post(SONGS_ENDPOINT, formData);
    console.log("Song creation response:", res);

    validateResponse(res);
    return res.data.data;
  } catch (error) {
    console.error("Error creating song:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
}

export async function relatedSongs(userId) {
  try {
    console.log("Fetching related songs for user:", userId);
    const res = await api.get(`${SONGS_ENDPOINT}/user/${userId}`);
    console.log("Related songs response:", res);

    // Handle different response formats
    if (res.data && Array.isArray(res.data)) {
      return res.data; // API returned array directly
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data; // API returned { data: [...] }
    } else if (res.data && res.data.data === null) {
      console.warn("API returned null data for related songs, returning empty array");
      return []; // API returned { data: null }
    } else {
      console.warn("Unexpected API response format for related songs, returning empty array:", res.data);
      return []; // Fallback to empty array for any other format
    }
  } catch (error) {
    console.error("Error fetching related songs:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Return empty array instead of throwing
    return [];
  }
}

export async function songShow(id) {
  try {
    console.log("Fetching song details for ID:", id);
    const res = await api.get(`${SONGS_ENDPOINT}/${id}`);
    console.log("Song details response:", res);

    // Handle different response formats
    if (res.data && res.data.data) {
      return res.data.data; // API returned { data: {...} }
    } else if (res.data && typeof res.data === 'object') {
      return res.data; // API returned the song object directly
    } else {
      console.warn("Unexpected API response format for song details:", res.data);
      // Return a fallback song object
      return {
        _id: id,
        title: "Song Not Available",
        artist: "Unknown",
        album: "Unknown",
        coverImage: "https://via.placeholder.com/300?text=Not+Available",
        audioUrl: "",
        user_id: { username: "unknown" }
      };
    }
  } catch (error) {
    console.error("Error fetching song:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Return a fallback song object instead of throwing
    return {
      _id: id,
      title: "Error Loading Song",
      artist: "Unknown",
      album: "Error",
      coverImage: "https://via.placeholder.com/300?text=Error",
      audioUrl: "",
      user_id: { username: "unknown" }
    };
  }
}

export async function songUpdate(id, formData) {
  try {
    console.log("Updating song with ID:", id);
    const res = await api.put(`${SONGS_ENDPOINT}/${id}`, formData);
    console.log("Song update response:", res);

    validateResponse(res);
    return res.data.data;
  } catch (error) {
    console.error("Error updating song:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
}

export async function songDelete(id) {
  try {
    console.log("Deleting song with ID:", id);
    const res = await api.delete(`${SONGS_ENDPOINT}/${id}`);
    console.log("Song deletion response:", res);

    validateResponse(res);
    return res.data.data;
  } catch (error) {
    console.error("Error deleting song:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
}
