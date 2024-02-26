import { io } from "socket.io-client";

const socket = io("https://bk-b-voting.onrender.com");

export default socket;
