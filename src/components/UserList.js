import React from 'react';
import { useChatContext } from '../context/ChatContext';
import '../styles/UserList.css';

const UserList = () => {
  const { state } = useChatContext();

  return (
    <div className="user-list">
      <h3>Usuarios en línea</h3>
      <div className="users">
        {state.users.length === 0 ? (
          <p className="no-users">No hay usuarios conectados</p>
        ) : (
          state.users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
                <span className={`status-indicator ${user.status}`}></span>
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-status">{user.status === 'online' ? 'En línea' : 'Ausente'}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="current-user">
        <div className="user-item">
          <div className="user-avatar">
            <img src={state.currentUser.avatar} alt={state.currentUser.name} />
            <span className="status-indicator online"></span>
          </div>
          <div className="user-info">
            <span className="user-name">{state.currentUser.name} (Tú)</span>
            <span className="user-status">En línea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
