import api from "../utils/api.js";

const SONGS_ENDPOINT = "/songs";

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

    validateResponse(res);
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching all songs:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Don't throw the error, return an empty array for unauthenticated users
    if (error.response?.status === 401) {
      return [];
    }
    throw error;
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

    validateResponse(res);
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching related songs:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
}

export async function songShow(id) {
  try {
    console.log("Fetching song details for ID:", id);
    const res = await api.get(`${SONGS_ENDPOINT}/${id}`);
    console.log("Song details response:", res);

    validateResponse(res);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching song:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
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
