import axios from "axios";

const API_URL = "https://musicfy-clone.netlify.app/.netlify/functions/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function testApi() {
  try {
    console.log("Testing API responses...");

    // Test getAllSongs
    console.log("\nTesting getAllSongs:");
    const allSongsResponse = await api.get("/songs");
    console.log("Response:", allSongsResponse.data);

    // Test songShow (if we have any songs)
    if (allSongsResponse.data.data && allSongsResponse.data.data.length > 0) {
      console.log("\nTesting songShow:");
      const songShowResponse = await api.get(
        `/songs/${allSongsResponse.data.data[0]._id}`
      );
      console.log("Response:", songShowResponse.data);
    }

    // Test getLikedSongs
    console.log("\nTesting getLikedSongs:");
    const likedSongsResponse = await api.get("/liked-songs");
    console.log("Response:", likedSongsResponse.data);

    // Test addToLikedSongs (if we have any songs)
    if (allSongsResponse.data.data && allSongsResponse.data.data.length > 0) {
      console.log("\nTesting addToLikedSongs:");
      const addResponse = await api.post("/liked-songs", {
        songId: allSongsResponse.data.data[0]._id,
      });
      console.log("Response:", addResponse.data);

      // Test removeFromLikedSongs
      console.log("\nTesting removeFromLikedSongs:");
      const removeResponse = await api.delete(
        `/liked-songs/${allSongsResponse.data.data[0]._id}`
      );
      console.log("Response:", removeResponse.data);
    }

    console.log("\nAll tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error.response?.data || error.message);
  }
}

// Run the tests
testApi();
