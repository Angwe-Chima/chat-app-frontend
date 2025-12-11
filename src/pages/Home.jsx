import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MessageContainer } from '../components/MessageContainer';

export const Home = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      backgroundColor: '#0f172a',
      gap: '0',
    }}>
      <Sidebar
        onSelectConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
      />
      <MessageContainer selectedConversation={selectedConversation} />
    </div>
  );
};