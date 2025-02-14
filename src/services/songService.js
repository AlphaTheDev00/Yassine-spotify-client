import { getToken } from "../utils/auth.js";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/songs";

export async function songCreate(formData) {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function relatedSongs(userId) {
  try {
    const relatedSongsResponse = await axios.get(`${BASE_URL}/user/${userId}`);
    const relatedSongs = relatedSongsResponse.data;
    return relatedSongs
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function songShow(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.log("❌ Error fetching song:", error);
    throw error;
  }
}

export async function songUpdate(id, formData) {
  try {
    const res = await axios.put(BASE_URL + `/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function songDelete(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error deleting song:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export const getAllSongs = () => axios.get(BASE_URL);
