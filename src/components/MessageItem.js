import React from 'react';
import { useChatContext } from '../context/ChatContext';
import '../styles/MessageItem.css';

const MessageItem = ({ message }) => {
  const { state } = useChatContext();
  const isCurrentUser = message.sender.id === state.currentUser.id;
  
  // Formatear la hora del mensaje
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-item ${isCurrentUser ? 'message-mine' : 'message-other'}`}>
      {!isCurrentUser && (
        <div className="message-avatar">
          <img src={message.sender.avatar} alt={message.sender.name} />
        </div>
      )}
      <div className="message-content">
        {!isCurrentUser && <div className="message-sender">{message.sender.name}</div>}
        <div className="message-bubble">
          <p>{message.content}</p>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
