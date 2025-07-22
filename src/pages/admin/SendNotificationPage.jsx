import AdminSendNotification from '../../components/notifications/AdminSendNotification';

export default function SendNotificationPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Gửi thông báo cho tất cả user</h1>
        <AdminSendNotification />
      </div>
    </div>
  );
} 