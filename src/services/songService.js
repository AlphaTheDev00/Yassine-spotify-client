import api from "../utils/api.js";

const SONGS_ENDPOINT = "/songs";

export async function songCreate(formData) {
  try {
    const res = await api.post(SONGS_ENDPOINT, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function relatedSongs(userId) {
  try {
    const relatedSongsResponse = await api.get(
      `${SONGS_ENDPOINT}/user/${userId}`
    );
    const relatedSongs = relatedSongsResponse.data;
    return relatedSongs;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function songShow(id) {
  try {
    const res = await api.get(`${SONGS_ENDPOINT}/${id}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.log("❌ Error fetching song:", error);
    throw error;
  }
}

export async function songUpdate(id, formData) {
  try {
    const res = await api.put(`${SONGS_ENDPOINT}/${id}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function songDelete(id) {
  try {
    const res = await api.delete(`${SONGS_ENDPOINT}/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error deleting song:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const getAllSongs = () => api.get(SONGS_ENDPOINT);
