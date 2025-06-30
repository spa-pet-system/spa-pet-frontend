import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaDog, FaConciergeBell, FaBoxOpen, FaClipboardList, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, to: "/admin" },
  { label: "Quản lý người dùng", icon: <FaUsers />, to: "/admin/users" },
  { label: "Quản lý dịch vụ", icon: <FaConciergeBell />, to: "/admin/services" },
  { label: "Quản lý sản phẩm", icon: <FaBoxOpen />, to: "/admin/products" },
  { label: "Quản lý đơn hàng", icon: <FaClipboardList />, to: "/admin/orders" },
  { label: "Quản lý lịch hẹn", icon: <FaCalendarAlt />, to: "/admin/appointments" },
  { label: "Đăng xuất", icon: <FaSignOutAlt />, to: "/logout" },
];

export default function SidebarAdmin() {
  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col py-8 px-4 border-r">
      <div className="mb-8 text-2xl font-bold text-orange-500 text-center">PetCare Admin</div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-orange-100 text-gray-700 font-medium ${isActive ? "bg-orange-500 text-white" : ""}`
            }
            end={item.to === "/admin"}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 