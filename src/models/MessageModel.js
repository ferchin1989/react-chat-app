import { v4 as uuidv4 } from 'uuid';

class MessageModel {
  constructor(content, sender, timestamp = new Date(), id = uuidv4()) {
    this.id = id;
    this.content = content;
    this.sender = sender; // Objeto usuario que envía el mensaje
    this.timestamp = timestamp;
    this.isRead = false;
  }

  static fromJSON(json) {
    return new MessageModel(
      json.content,
      json.sender,
      new Date(json.timestamp),
      json.id
    );
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      sender: this.sender,
      timestamp: this.timestamp,
      isRead: this.isRead
    };
  }

  markAsRead() {
    this.isRead = true;
    return this;
  }
}

export default MessageModel;
