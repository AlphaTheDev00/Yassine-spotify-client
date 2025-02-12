import axios from "axios";

const API_URL = "http://localhost:3000/api/songs";

export const getAllSongs = () => axios.get(API_URL);
