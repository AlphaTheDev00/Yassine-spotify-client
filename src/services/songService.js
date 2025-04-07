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

    // If API is down, use mock data
    if (!res || !res.data) {
      console.warn("API returned no data, using mock data");
      return generateMockSongs(40);
    }

    // Handle both response formats: { data: [...] } and [...] directly
    if (res.data && Array.isArray(res.data)) {
      return res.data; // API returned array directly
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data; // API returned { data: [...] }
    } else if (res.data && res.data.data === null) {
      console.warn("API returned null data, using mock data");
      return generateMockSongs(40); // Generate mock data
    } else {
      console.warn("Unexpected API response format, using mock data:", res.data);
      return generateMockSongs(40); // Generate mock data
    }
  } catch (error) {
    console.error("Error fetching all songs:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Generate mock data on error
    return generateMockSongs(40);
  }
}

// Helper function to generate mock songs
function generateMockSongs(count) {
  const mockSongs = [];
  const artists = ["The Weeknd", "Dua Lipa", "Ed Sheeran", "Billie Eilish", "Post Malone", "Taylor Swift", "Drake", "Ariana Grande"];
  const albums = ["After Hours", "Future Nostalgia", "Divide", "Happier Than Ever", "Hollywood's Bleeding", "Lover", "Certified Lover Boy", "Positions"];
  const genres = ["Pop", "R&B", "Rock", "Hip Hop", "Electronic", "Country", "Jazz", "Alternative"];
  
  for (let i = 1; i <= count; i++) {
    const artistIndex = i % artists.length;
    const albumIndex = i % albums.length;
    const genreIndex = i % genres.length;
    
    mockSongs.push({
      _id: `mock-song-${i}`,
      title: `Song Title ${i}`,
      artist: artists[artistIndex],
      album: albums[albumIndex],
      genre: genres[genreIndex],
      duration: 180 + (i * 10),
      coverImage: `https://picsum.photos/seed/song${i}/300/300`,
      audio_url: "https://cdn.freesound.org/previews/635/635250_11861866-lq.mp3",
      user_id: {
        _id: `user-${Math.ceil(i/5)}`,
        username: `artist_${Math.ceil(i/5)}`,
        profileImage: `https://picsum.photos/seed/user${Math.ceil(i/5)}/150/150`
      },
      createdAt: new Date(Date.now() - (i * 86400000)).toISOString() // Each song created a day apart
    });
  }
  
  return mockSongs;
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
