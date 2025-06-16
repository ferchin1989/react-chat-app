import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Estado inicial del chat
const initialState = {
  messages: [],
  users: [],
  currentUser: {
    id: uuidv4(),
    name: 'Usuario' + Math.floor(Math.random() * 1000),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
  },
  isConnected: false,
  error: null
};

// Acciones para el reducer
export const ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_USERS: 'SET_USERS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer para manejar las acciones
const chatReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case ACTIONS.SET_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.payload
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Crear el contexto
export const ChatContext = createContext();

// Proveedor del contexto
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext debe ser usado dentro de un ChatProvider');
  }
  return context;
};
