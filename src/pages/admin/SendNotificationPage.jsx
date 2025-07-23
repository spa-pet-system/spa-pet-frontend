import AdminSendNotification from '../../components/notifications/AdminSendNotification';
import SidebarAdmin from "~/components/SidebarAdmin";
export default function SendNotificationPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />  
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Gửi thông báo cho tất cả user</h1>
        <AdminSendNotification />
      </div>
    </div>
  );
} 