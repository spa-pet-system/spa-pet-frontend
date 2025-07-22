import { useNotification } from "./NotificationProvider";
import dayjs from "dayjs";

export default function NotificationDropdown() {
  const { list, markRead } = useNotification();

  if (!list.length) return <p className="p-4 text-sm">Không có thông báo.</p>;

  return (
    <ul className="max-h-80 w-80 overflow-y-auto">
      {list.map((n) => (
        <li
          key={n._id}
          onClick={() => markRead(n._id)}
          className={`p-3 border-b cursor-pointer ${
            n.read ? "bg-white" : "bg-blue-50"
          }`}
        >
          <p className="font-medium">{n.title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{n.message}</p>
          <p className="text-xs text-right text-gray-400 mt-1">
            {dayjs(n.createdAt).fromNow()}
          </p>
        </li>
      ))}
    </ul>
  );
}
