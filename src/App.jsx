import React, { useContext } from 'react';
import AppRouter from './routes/AppRouter';
import { AuthContext } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from './components/chat/ChatWindow';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const { loading } = useContext(AuthContext);
  const [showChat, setShowChat] = React.useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer
        position="top-left" // 👈 Vị trí ở góc trái dưới
        autoClose={3000}       // Tự động tắt sau 3 giây
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Nút nổi mở chat */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-24 right-4 bg-blue-600 text-white rounded-full shadow-lg p-4 z-50 hover:bg-blue-700 flex items-center justify-center"
        style={{ width: 56, height: 56 }}
        aria-label="Mở chat với admin"
      >
        <MessageCircle size={28} />
      </button>
      {/* Cửa sổ chat */}
      {showChat && (
        <ChatWindow onClose={() => setShowChat(false)} />
      )}
    </>
  );
}
