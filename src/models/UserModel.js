import { v4 as uuidv4 } from 'uuid';

class UserModel {
  constructor(name, avatar = null, id = uuidv4(), status = 'online') {
    this.id = id;
    this.name = name;
    this.avatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    this.status = status;
    this.lastSeen = new Date();
  }

  static fromJSON(json) {
    const user = new UserModel(
      json.name,
      json.avatar,
      json.id,
      json.status
    );
    user.lastSeen = new Date(json.lastSeen);
    return user;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      status: this.status,
      lastSeen: this.lastSeen
    };
  }

  updateStatus(status) {
    this.status = status;
    if (status === 'online') {
      this.lastSeen = new Date();
    }
    return this;
  }
}

export default UserModel;
