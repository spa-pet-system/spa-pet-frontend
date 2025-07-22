import React, { createContext, useState, useEffect, useContext } from 'react';
import socket from '../../utils/socket';
import { AuthContext } from '../../contexts/AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('registerUser', currentUser._id);
    }

    socket.on('receiveNotification', (data) => {
      setNotifications(prev => [data, ...prev]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
