import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatView from './views/ChatView';
import './App.css';

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <ChatView />
      </ChatProvider>
    </div>
  );
}

export default App;
