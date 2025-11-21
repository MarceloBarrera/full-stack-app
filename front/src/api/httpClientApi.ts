import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
