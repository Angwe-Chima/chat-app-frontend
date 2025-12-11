import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useSocketContext } from '../contexts/SocketContext';
import { apiCall } from '../utils/api';
import { Message } from './Message';

export const MessageContainer = ({ selectedConversation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState("");
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      setError("");
      try {
        const data = await apiCall(`/api/message/${selectedConversation._id}`);
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const senderId = newMessage.senderId?._id || newMessage.senderId;
      if (senderId === selectedConversation?._id || newMessage.receiverId === authUser._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation, authUser._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!messageInput.trim()) return;

    setSending(true);
    setError("");
    try {
      const data = await apiCall(`/api/message/send/${selectedConversation._id}`, {
        method: 'POST',
        body: JSON.stringify({ message: messageInput }),
      });
      setMessages([...messages, data]);
      setMessageInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (!selectedConversation) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#64748b',
      }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', color: '#e2e8f0' }}>
          Welcome {authUser.fullName} 👋
        </h2>
        <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(100, 116, 139, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <img
          src={selectedConversation.profilePic}
          alt="avatar"
          style={{ width: '48px', height: '48px', borderRadius: '50%' }}
        />
        <span style={{ color: '#fff', fontWeight: '700', fontSize: '1.125rem' }}>
          {selectedConversation.fullName}
        </span>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {loading && <p style={{ color: '#64748b' }}>Loading messages...</p>}
        {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
        {messages.map((message) => (
          <Message key={message._id} message={message} authUser={authUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        padding: '1.25rem 1.5rem',
        borderTop: '1px solid rgba(100, 116, 139, 0.2)',
        display: 'flex',
        gap: '0.75rem',
      }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(100, 116, 139, 0.3)',
            backgroundColor: '#1a202c',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '1.5rem',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontWeight: '600',
            cursor: sending ? 'not-allowed' : 'pointer',
            opacity: sending ? 0.5 : 1,
            minWidth: '70px',
          }}
        >
          {sending ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};