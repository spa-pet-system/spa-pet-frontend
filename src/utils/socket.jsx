// src/utils/socket.jsx
import { io } from "socket.io-client";

const socket = io("https://spa-pet-backend.onrender.com", {
  withCredentials: true
});

export default socket;
