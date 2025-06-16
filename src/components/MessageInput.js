import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatController from '../controllers/ChatController';
import '../styles/MessageInput.css';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch } = useChatContext();
  const chatController = new ChatController(dispatch);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Enviar el mensaje usando el controlador
      chatController.sendMessage(message, state.currentUser);
      
      // Limpiar el campo de entrada
      setMessage('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        disabled={!state.isConnected}
      />
      <button 
        type="submit" 
        disabled={!message.trim() || !state.isConnected}
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;
