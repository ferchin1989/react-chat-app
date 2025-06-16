import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import MessageItem from './MessageItem';
import '../styles/MessageList.css';

const MessageList = () => {
  const { state } = useChatContext();
  const messagesEndRef = useRef(null);

  // Hacer scroll automático al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  return (
    <div className="message-list">
      {state.messages.length === 0 ? (
        <div className="no-messages">
          <p>No hay mensajes aún. ¡Comienza la conversación!</p>
        </div>
      ) : (
        state.messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
