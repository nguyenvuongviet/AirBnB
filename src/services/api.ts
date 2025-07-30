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
  let token = "";
  const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (currentUser) {
    token = JSON.parse(currentUser).token;
  }

  config.headers = {
    ...config.headers,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgNTAiLCJIZXRIYW5TdHJpbmciOiIxMC8xMC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NjAwNTQ0MDAwMDAiLCJuYmYiOjE3NDA4NzM2MDAsImV4cCI6MTc2MDIyNzIwMH0.mMbbQrfpocDbm-PEesfDTdZug1iAejOCCrKEFpq4pr8",
    token: `${token}`,
  };
  return config;
});

export default api;
