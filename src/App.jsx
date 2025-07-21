import React, { useContext, useState } from 'react';
import AppRouter from './routes/AppRouter';
import { AuthContext } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NotificationProvider } from './components/notifications/NotificationProvider';
import NotificationBell from './components/notifications/NotificationBell';
import NotificationDropdown from './components/notifications/NotificationDropdown';
import ChatWidget from './components/chat/ChatWidget';

export default function App() {
  const { loading } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <NotificationProvider>
      <div className="fixed top-3 right-10 z-50">
        <NotificationBell onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
            <NotificationDropdown />
          </div>
        )}
      </div>

      <AppRouter />
      <ChatWidget />
      
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </NotificationProvider>
  );
}
