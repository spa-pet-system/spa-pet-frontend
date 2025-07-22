import React, { useEffect, useState, useRef, useContext } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import axios from "~/api/axiosClient";
import { AuthContext } from "~/contexts/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef();

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Khi dropdown mở, fetch notification mới
  useEffect(() => {
    if (showNotif) {
      axios.get("/chat/notifications")
        .then(res => {
          const data = res.data || [];
          
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.isRead).length);
        })
        .catch(() => {
          setNotifications([]);
          setUnreadCount(0);
        });
    }
  }, [showNotif]);


  const baseClass   = "text-base font-medium transition-all duration-200";
  const activeClass = `text-base transition-all duration-200 text-orange-500 font-bold`;
  const normalClass = `${baseClass} text-black hover:text-orange-500`;

  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-md ml-28 mr-28 rounded-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-orange-500">Patte</span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex gap-6 font-medium text-gray-800">
        <NavLink to="/" end    className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
        <NavLink to="/about"   className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
        <NavLink to="/service" className={({ isActive }) => isActive ? activeClass : normalClass}>Services</NavLink>
        <NavLink to="/shop"    className={({ isActive }) => isActive ? activeClass : normalClass}>Shop</NavLink>
        <NavLink to="/news"    className={({ isActive }) => isActive ? activeClass : normalClass}>News</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
      </nav>

      {/* Icons & notifications */}
      <div className="flex items-center gap-4 text-gray-800">
        <FaSearch className="cursor-pointer hover:text-orange-500" />
        <FaHeart  className="cursor-pointer hover:text-orange-500" />

        <div ref={notifRef} className="relative">
          {/* Bell button */}
          <button
            onClick={() => setShowNotif(v => !v)}
            className="relative focus:outline-none"
          >
            <FaBell className="text-lg hover:text-orange-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <span className="font-semibold">Thông báo</span>
                {unreadCount > 0 && (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length === 0 && (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    Không có thông báo
                  </li>
                )}
                {notifications.map(n => (
                  <li
                    key={n._id}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                      n.isRead ? "" : "bg-gray-50 font-medium"
                    }`}
                  >
                    <div>{n.title}</div>
                    <div className="text-xs text-gray-600">{n.content}</div>
                    <div className="text-2xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center border-t">
                <Link
                  to="/customer/notifications"
                  className="block w-full px-4 py-2 text-blue-500 hover:bg-gray-50 text-sm"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cart icon */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="cursor-pointer hover:text-orange-500" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            1
          </span>
        </Link>
      </div>
    </div>
  );
}
