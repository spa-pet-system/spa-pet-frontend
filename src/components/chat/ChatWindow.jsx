import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // hoặc URL backend thật của bạn

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Tin nhắn chào mừng khi mở chat
    setMessages(prev => [...prev, { from: 'admin', content: 'Chào bạn! Admin sẽ phản hồi trong ít phút...' }]);

    // Lắng nghe tin nhắn phản hồi từ server
    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { from: 'me', content: newMessage };
      setMessages(prev => [...prev, message]);
      socket.emit('sendMessage', message);
      setNewMessage('');
    }
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
              msg.from === 'me' ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start'
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
