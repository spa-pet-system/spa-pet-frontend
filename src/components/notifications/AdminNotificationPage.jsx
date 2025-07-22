import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminNotificationPage() {
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]); // danh sách user nhận thông báo
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách user từ backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('/api/users'); // API lấy user, bạn thay đổi tùy backend
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  // Chọn / bỏ chọn từng user
  function toggleUser(id) {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(uid => uid !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  }

  // Gửi thông báo
  async function handleSend() {
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung thông báo');
      return;
    }
    if (!sendToAll && selectedUserIds.length === 0) {
      alert('Vui lòng chọn người nhận hoặc chọn gửi tất cả');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/admin/notifications', {
        content,
        recipients: sendToAll ? [] : selectedUserIds,
      });
      alert('Gửi thông báo thành công');
      setContent('');
      setSelectedUserIds([]);
      setSendToAll(false);
    } catch (err) {
      console.error(err);
      alert('Gửi thông báo thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Gửi thông báo cho người dùng</h2>

      <div style={{ marginBottom: 10 }}>
        <textarea
          rows={4}
          style={{ width: '100%' }}
          placeholder="Nội dung thông báo"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={sendToAll}
            onChange={e => setSendToAll(e.target.checked)}
          />
          Gửi cho tất cả người dùng
        </label>
      </div>

      {!sendToAll && (
        <div
          style={{
            border: '1px solid #ccc',
            maxHeight: 200,
            overflowY: 'auto',
            padding: 10,
            marginBottom: 10,
          }}
        >
          {users.length === 0 && <p>Đang tải danh sách người dùng...</p>}
          {users.map(user => (
            <label key={user._id} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={selectedUserIds.includes(user._id)}
                onChange={() => toggleUser(user._id)}
              />
              {user.name} ({user.email})
            </label>
          ))}
        </div>
      )}

      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Đang gửi...' : 'Gửi thông báo'}
      </button>
    </div>
  );
}
