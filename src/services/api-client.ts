import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://bk-b-voting.onrender.com",
  params: {},
});

export default apiClient;
