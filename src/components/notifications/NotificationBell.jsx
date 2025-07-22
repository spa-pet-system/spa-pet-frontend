import { Bell } from 'lucide-react'
import { useNotification } from './NotificationProvider'
import clsx from 'clsx'

export default function NotificationBell() {
  const { notifications } = useNotification()
  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="relative group">
      <Bell className="w-6 h-6 text-black" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {unreadCount}
        </span>
      )}
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg p-2 rounded hidden group-hover:block z-50">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có thông báo.</p>
        ) : (
          notifications.map((noti, index) => (
            <div key={index} className="text-sm py-1 border-b last:border-b-0">
              <strong>{noti.title}</strong>
              <p>{noti.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
