import React from 'react';
import socket from "../../utils/socket";


export default function TestNotification() {
  const handleSend = () => {
    socket.emit('sendNotificationToUsers', {
      userIds: [
        '665f3c2f1a23456789abcdef',
        '66604e781b23456789abcde0'
      ],
      notification: {
        type: 'system',
        title: 'Thông báo hệ thống',
        content: 'Đây là tin nhắn gửi cho nhiều user!'
      }
    });
  };

  return (
    <div className="fixed bottom-40 left-5 z-50">
      <button onClick={handleSend} className="bg-red-500 text-white px-4 py-2 rounded">
        Gửi test nhiều người
      </button>
    </div>
  );
}
