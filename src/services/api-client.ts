import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://bk-b-voting.onrender.com",
  withCredentials: true,
  params: {},
});

export default apiClient;
