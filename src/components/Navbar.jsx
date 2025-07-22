import { FaSearch, FaHeart, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef();

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mấy thông báo mẫu
  const notifications = [
    "Cuộc hẹn 09:00 ngày 21/07 đã được xác nhận",
    "Bạn có 1 tin nhắn mới từ Spa Pet",
    "Giá ưu đãi 20% cho dịch vụ Tắm lông"
  ];

  const baseClass = "text-base font-medium transition-all duration-200";
  const activeClass = `text-base transition-all duration-200 text-orange-500 font-bold`;
  const normalClass = `${baseClass} text-black hover:text-orange-500`;

  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-md ml-28 mr-28 " style={{ borderRadius: '6px' }}>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-orange-500">Patte</span>
      </div>
      <nav className="hidden md:flex gap-6 font-medium text-gray-800">
        <NavLink to="/" end className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
        <NavLink to="/service" className={({ isActive }) => isActive ? activeClass : normalClass}>Services</NavLink>
        <NavLink to="/shop" className={({ isActive }) => isActive ? activeClass : normalClass}>Shop</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? activeClass : normalClass}>News</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
        <Link to="/customer/notifications" className="block py-2 px-4 hover:bg-gray-200 rounded">
          <span>Thông báo</span>
        </Link>
      </nav>
      <div className="flex items-center gap-4 text-gray-800">
        <FaSearch />
        <FaHeart />
          {/* Thông báo */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotif((v) => !v)}
            className="cursor-pointer focus:outline-none"
          >
            <FaBell className="text-lg hover:text-orange-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
              <div className="px-4 py-2 border-b font-semibold">Thông báo</div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((msg, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {msg}
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="px-4 py-2 text-gray-500 text-sm">Không có thông báo</li>
                )}
              </ul>
              <div className="text-center border-t">
                <button className="w-full px-4 py-2 text-blue-500 hover:bg-gray-50 text-sm">
                  Xem tất cả
                </button>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <FaShoppingCart className="cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            1
          </span>
        </Link>
      </div>
    </div>
  );
}
