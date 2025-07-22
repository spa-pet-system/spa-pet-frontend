import React, { useEffect, useState } from 'react'
import axios from '../../api/axiosClient';

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      sender: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Gọi API AI
    try {
      const res = await axios.post('/chat/ai', { message: input });
      const aiMessage = {
        sender: 'ai',
        content: res.data.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', content: 'AI lỗi, thử lại sau!', timestamp: new Date() }]);
    }
  }

  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-semibold">Chat với AI</h3>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Đóng</button>
      </div>
      <div
        className="flex-1 p-3 overflow-y-auto space-y-2"
        style={{ backgroundColor: '#f9f9f9' }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[80%] ${
              m.sender === 'user' ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start'
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex space-x-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') sendMessage()
          }}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  )
}
