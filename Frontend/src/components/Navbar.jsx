import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
  HiOutlineBars3,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUser,
} from "react-icons/hi2";

export default function Navbar({ onMenuClick, collapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const dropdownRef = useRef(null);
  const avatar = localStorage.getItem("avatar");

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHamburgerClick = () => {
    setRotated((r) => !r);
    onMenuClick();
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-cream-200 dark:border-gray-700 shrink-0">
      {/* Left: hamburger + welcome */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleHamburgerClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <HiOutlineBars3
            className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-500 ease-in-out"
            style={{ transform: rotated ? "rotate(360deg)" : "rotate(0deg)" }}
          />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Welcome back,{" "}
            <span className="text-gray-900 dark:text-white font-semibold">
              {user?.full_name}
            </span>
          </h2>
        </div>
      </div>

      {/* Right: theme toggle + profile */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                {user?.full_name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.full_name}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={() => { navigate("/dashboard/profile"); setDropdownOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <HiOutlineUser className="w-4 h-4" />
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
