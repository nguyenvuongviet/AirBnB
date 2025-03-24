import axios from "axios";

type TConfig = {
  headers: any;
};

import config from "../config";
import { STORAGE_KEYS } from "../constants";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use((config: TConfig) => {
  let assessToken = "";
  const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (currentUser) {
    assessToken = JSON.parse(currentUser).accessToken;
  }

  config.headers = {
    ...config.headers,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ",
    Authorization: `Bearer ${assessToken}`,
  };
  return config;
});

export default api;
