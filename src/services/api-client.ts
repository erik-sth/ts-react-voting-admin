import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.4.50:3000",
  params: {},
});

export default apiClient;