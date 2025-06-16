import React from 'react';
import { useChatContext } from '../context/ChatContext';
import '../styles/ChatHeader.css';

const ChatHeader = () => {
  const { state } = useChatContext();

  return (
    <div className="chat-header">
      <div className="chat-title">
        <h2>Chat React MVC</h2>
        <div className={`connection-status ${state.isConnected ? 'connected' : 'disconnected'}`}>
          {state.isConnected ? 'Conectado' : 'Desconectado'}
        </div>
      </div>
      <div className="user-info">
        <span className="user-name">{state.currentUser.name}</span>
        <div className="user-avatar">
          <img src={state.currentUser.avatar} alt={state.currentUser.name} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
