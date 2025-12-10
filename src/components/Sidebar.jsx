import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useSocketContext } from '../contexts/SocketContext';
import Conversation from './Conversation';
import { styles } from '../styles/styles';

const API_URL = "https://chat-app-backend-cd4s.onrender.com";

const Sidebar = ({ onSelectConversation, selectedConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversations(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h2 style={styles.sidebarTitle}>Chats</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div style={styles.conversationsList}>
        {loading ? (
          <div style={styles.loadingContainer}>Loading...</div>
        ) : (
          conversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              onSelect={onSelectConversation}
              isSelected={selectedConversation?._id === conversation._id}
              isOnline={onlineUsers.includes(conversation._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;