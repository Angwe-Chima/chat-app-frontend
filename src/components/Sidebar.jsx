import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useSocketContext } from "../contexts/SocketContext";
import { apiCall } from "../utils/api";
import { Conversation } from "./Conversation";

export const Sidebar = ({ onSelectConversation, selectedConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    if (!authUser) return; // wait for login

    const getConversations = async () => {
      setLoading(true);
      try {
        const data = await apiCall("/api/users");
        setConversations(data);
      } catch (err) {
        console.error("Failed to load conversations:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser]);

  const handleLogout = async () => {
    try {
      await apiCall("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div
      style={{
        width: "320px",
        minWidth: "320px",
        backgroundColor: "#1e293b",
        borderRight: "1px solid rgba(100, 116, 139, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1.25rem",
          borderBottom: "1px solid rgba(100, 116, 139, 0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Chats
        </h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#dc2626",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
        {loading && (
          <p style={{ color: "#64748b", padding: "1rem" }}>Loading...</p>
        )}
        {conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            onSelect={onSelectConversation}
            isSelected={selectedConversation?._id === conversation._id}
            isOnline={onlineUsers.includes(conversation._id)}
          />
        ))}
      </div>
    </div>
  );
};
