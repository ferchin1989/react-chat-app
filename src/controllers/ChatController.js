import { ACTIONS } from '../context/ChatContext';
import MessageModel from '../models/MessageModel';
import UserModel from '../models/UserModel';

class ChatController {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  // Método para enviar un mensaje
  sendMessage(content, sender) {
    if (!content.trim()) return;
    
    const newMessage = new MessageModel(content, sender);
    
    // En una aplicación real, aquí enviaríamos el mensaje al servidor
    // Por ahora, simplemente lo agregamos al estado local
    this.dispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: newMessage
    });
    
    return newMessage;
  }

  // Método para recibir un mensaje (simulado)
  receiveMessage(message) {
    const receivedMessage = MessageModel.fromJSON(message);
    
    this.dispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: receivedMessage
    });
    
    return receivedMessage;
  }

  // Método para actualizar la lista de usuarios
  updateUsers(users) {
    const userModels = users.map(user => UserModel.fromJSON(user));
    
    this.dispatch({
      type: ACTIONS.SET_USERS,
      payload: userModels
    });
  }

  // Método para actualizar el usuario actual
  updateCurrentUser(user) {
    this.dispatch({
      type: ACTIONS.SET_CURRENT_USER,
      payload: user
    });
  }

  // Método para manejar errores
  handleError(error) {
    this.dispatch({
      type: ACTIONS.SET_ERROR,
      payload: error.message || 'Ha ocurrido un error'
    });
    
    // Limpiar el error después de 5 segundos
    setTimeout(() => {
      this.dispatch({
        type: ACTIONS.CLEAR_ERROR
      });
    }, 5000);
  }

  // Método para establecer el estado de conexión
  setConnectionStatus(isConnected) {
    this.dispatch({
      type: ACTIONS.SET_CONNECTION_STATUS,
      payload: isConnected
    });
  }
}

export default ChatController;
