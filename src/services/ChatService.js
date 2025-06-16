import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/UserModel';
import MessageModel from '../models/MessageModel';

// Simulación de un servicio de chat
class ChatService {
  constructor(controller) {
    this.controller = controller;
    this.connected = false;
    this.botUsers = [
      new UserModel('Bot Asistente', 'https://api.dicebear.com/7.x/bottts/svg?seed=bot1'),
      new UserModel('Bot Soporte', 'https://api.dicebear.com/7.x/bottts/svg?seed=bot2')
    ];
    
    // Respuestas predefinidas para simular una conversación
    this.botResponses = [
      '¡Hola! ¿En qué puedo ayudarte?',
      'Entiendo, déjame ver qué puedo hacer.',
      '¿Necesitas más información sobre algo?',
      'Estoy aquí para ayudarte con cualquier duda.',
      '¡Gracias por usar nuestro chat!',
      '¿Hay algo más en lo que pueda ayudarte?'
    ];
  }

  // Conectar al servicio de chat
  connect() {
    return new Promise((resolve) => {
      // Simulamos un retraso en la conexión
      setTimeout(() => {
        this.connected = true;
        this.controller.setConnectionStatus(true);
        
        // Añadimos los bots a la lista de usuarios
        this.controller.updateUsers([...this.botUsers]);
        
        // Mensaje de bienvenida
        const welcomeMessage = new MessageModel(
          '¡Bienvenido al chat! Estoy aquí para ayudarte.',
          this.botUsers[0]
        );
        
        this.controller.receiveMessage(welcomeMessage);
        resolve(true);
      }, 1000);
    });
  }

  // Desconectar del servicio de chat
  disconnect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = false;
        this.controller.setConnectionStatus(false);
        resolve(true);
      }, 500);
    });
  }

  // Enviar un mensaje
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error('No estás conectado al chat'));
        return;
      }

      // Simulamos un retraso en el envío
      setTimeout(() => {
        resolve(message);
        
        // Simulamos una respuesta del bot después de un tiempo
        this.simulateBotResponse();
      }, 300);
    });
  }

  // Simular respuesta de un bot
  simulateBotResponse() {
    setTimeout(() => {
      // Elegimos un bot aleatorio
      const randomBot = this.botUsers[Math.floor(Math.random() * this.botUsers.length)];
      
      // Elegimos una respuesta aleatoria
      const randomResponse = this.botResponses[Math.floor(Math.random() * this.botResponses.length)];
      
      // Creamos el mensaje
      const botMessage = new MessageModel(
        randomResponse,
        randomBot
      );
      
      // Recibimos el mensaje
      this.controller.receiveMessage(botMessage);
    }, 1000 + Math.random() * 2000); // Respuesta entre 1-3 segundos
  }

  // Obtener historial de mensajes (simulado)
  getMessageHistory() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // En una aplicación real, obtendríamos los mensajes del servidor
        resolve([]);
      }, 500);
    });
  }
}

export default ChatService;
