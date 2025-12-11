import { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { API_URL } from "../utils/api";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      if (socket) socket.close();
      return;
    }

    // 🚀 Force WebSocket — stop infinite polling loop
    const newSocket = io(API_URL, {
      query: { userId: authUser._id },
      transports: ["websocket", "polling"], // WebSocket first
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      withCredentials: true,
    });

    // 🔥 Error logging
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [authUser]); // <-- remove `socket` from dependency to avoid loop

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
