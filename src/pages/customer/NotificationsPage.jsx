import React, { useEffect, useState, useContext } from 'react';
import axios from '../../api/axiosClient';
import { AuthContext } from '../../contexts/AuthContext';

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/chat/notifications/${user._id}`);
        setNotifications(res.data || []);
      } catch (err) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  if (loading) return <div>Đang tải thông báo...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông báo của bạn</h2>
      {notifications.length === 0 && <div>Không có thông báo nào.</div>}
      <ul>
        {notifications.map((n) => (
          <li key={n._id} className="mb-3 p-3 border rounded bg-gray-50">
            <div className="font-semibold">{n.title}</div>
            <div>{n.content}</div>
            <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 