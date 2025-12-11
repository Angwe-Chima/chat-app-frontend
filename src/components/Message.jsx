export const Message = ({ message, authUser }) => {
  const senderId = message.senderId?._id || message.senderId;
  const isFromMe = senderId === authUser._id;
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: isFromMe ? 'flex-end' : 'flex-start',
      marginBottom: '0.75rem',
      animation: 'slideIn 0.3s ease',
    }}>
      <div style={{
        maxWidth: '65%',
        padding: '0.75rem 1rem',
        borderRadius: isFromMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        background: isFromMe 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : '#2d3748',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}>
        <p style={{ color: '#fff', margin: '0 0 0.25rem 0', wordBreak: 'break-word' }}>
          {message.message}
        </p>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>
          {time}
        </span>
      </div>
    </div>
  );
};