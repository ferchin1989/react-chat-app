import React, { useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatController from '../controllers/ChatController';
import ChatService from '../services/ChatService';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';
import '../styles/ChatView.css';

const ChatView = () => {
  const { state, dispatch } = useChatContext();
  const chatController = new ChatController(dispatch);
  const chatService = new ChatService(chatController);

  useEffect(() => {
    // Conectar al servicio de chat cuando el componente se monta
    const connectToChat = async () => {
      try {
        await chatService.connect();
      } catch (error) {
        chatController.handleError(error);
      }
    };

    connectToChat();

    // Desconectar cuando el componente se desmonta
    return () => {
      chatService.disconnect();
    };
  }, []);

  return (
    <div className="chat-view">
      <ChatHeader />
      <div className="chat-container">
        <div className="chat-main">
          <MessageList />
          <MessageInput />
        </div>
        <UserList />
      </div>
      {state.error && (
        <div className="error-notification">
          {state.error}
        </div>
      )}
    </div>
  );
};

export default ChatView;
