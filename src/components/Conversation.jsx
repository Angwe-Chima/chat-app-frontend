export const Conversation = ({ conversation, onSelect, isSelected, isOnline }) => {
  return (
    <div
      onClick={() => onSelect(conversation)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        borderRadius: '0.75rem',
        gap: '0.75rem',
        transition: 'all 0.2s ease',
        backgroundColor: isSelected ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
        borderLeft: isSelected ? '3px solid #667eea' : 'none',
        paddingLeft: isSelected ? 'calc(1rem - 3px)' : '1rem',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img
          src={conversation.profilePic}
          alt="avatar"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: isOnline ? '2px solid #10b981' : '2px solid #4b5563',
          }}
        />
        {isOnline && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '12px',
            height: '12px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            border: '2px solid #1a202c',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
          }} />
        )}
      </div>
      <p style={{ color: '#e2e8f0', fontWeight: '500', margin: 0, fontSize: '0.95rem' }}>
        {conversation.fullName}
      </p>
    </div>
  );
};