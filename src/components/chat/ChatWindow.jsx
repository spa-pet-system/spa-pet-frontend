import React, { useEffect, useRef, useState, useContext } from 'react';
import { X } from 'lucide-react';
import io from 'socket.io-client';
import axios from '../../api/axiosClient';
import { AuthContext } from '../../contexts/AuthContext';

const socket = io('http://localhost:3000'); // hoặc URL backend thật của bạn

export default function ChatWindow({ onClose }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [adminId, setAdminId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Lấy adminId (giả sử chỉ có 1 admin, lấy từ API)
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // Lấy danh sách user có role=admin
        const res = await axios.get('/admin/users?role=admin');
        if (res.data && res.data.length > 0) {
          setAdminId(res.data[0]._id);
        }
      } catch (err) {
        // fallback: hardcode nếu chỉ có 1 admin
        setAdminId('admin-id-hardcode');
      }
    };
    if (user && user.role === 'customer') fetchAdmin();
    if (user && user.role === 'admin') setAdminId(user._id);
  }, [user]);

  // Khi có user và adminId, join socket và load lịch sử chat
  useEffect(() => {
    if (!user) return;
    socket.emit('join', { userId: user._id });
    const handleReceiveMessage = (message) => {
      if (user.role === 'admin' && message.from) {
        setCurrentUserId(message.from); // Lưu lại userId của user đang chat
      }
      setMessages(prev => [...prev, message]);
    };
    socket.on('receiveMessage', handleReceiveMessage);
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;
    // Nếu là admin, gửi về user đang chat; nếu là user, gửi về admin
    const msg = {
      from: user._id,
      to: user.role === 'admin' ? currentUserId : 'admin',
      content: newMessage,
    };
    socket.emit('sendMessage', msg);
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white border rounded-lg shadow-lg z-50 flex flex-col">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <span>Tư vấn cùng Admin</span>
        <button onClick={onClose}><X size={20} /></button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-2 max-h-80" style={{ backgroundColor: '#f9f9f9' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-[80%] ${
              msg.from === user._id ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-1 border rounded mr-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-3 py-1 rounded">
          Gửi
        </button>
      </div>
    </div>
  );
}
