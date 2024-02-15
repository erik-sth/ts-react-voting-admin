import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ticket-system-backend.onrender.com",
  params: {},
});

export default apiClient;
