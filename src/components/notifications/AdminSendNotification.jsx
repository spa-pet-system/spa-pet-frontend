import React, { useState } from 'react';
import axios from '../../api/axiosClient';

export default function AdminSendNotification() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/admin/notifications', { title, content });
      setSuccess('Gửi thông báo thành công!');
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Gửi thông báo thất bại!');
    }
  };

  return (
    <form onSubmit={handleSend} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gửi thông báo cho tất cả user</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-2"
        required
      />
      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Gửi thông báo
      </button>
    </form>
  );
} 