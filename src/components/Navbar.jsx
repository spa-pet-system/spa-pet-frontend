import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


export default function Navbar() {
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
            </nav>
            <div className="flex items-center gap-4 text-gray-800">
                <FaSearch />
                <FaHeart />
                <div className="relative">
                    <FaShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">1</span>
                </div>
            </div>
        </div>
    );
}
