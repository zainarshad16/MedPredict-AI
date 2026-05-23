import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineHome,
  HiOutlineArrowUpTray,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

const navItems = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Overview" },
  { to: "/dashboard/scan", icon: HiOutlineArrowUpTray, label: "New Scan" },
  { to: "/dashboard/history", icon: HiOutlineClock, label: "Scan History" },
  { to: "/dashboard/profile", icon: HiOutlineUser, label: "Profile" },
  { to: "/dashboard/about", icon: HiOutlineInformationCircle, label: "About AI" },
];

export default function Sidebar({ open, collapsed, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center ${collapsed ? "justify-center" : "gap-3"} ${collapsed ? "px-0 py-3" : "px-4 py-3"} rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
        : "text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-white"
    }`;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 flex flex-col h-full
        bg-white dark:bg-gray-800 border-r border-cream-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${collapsed ? "lg:w-20" : "lg:w-72"}
        w-72
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} h-16 ${collapsed ? "px-2" : "px-6"} border-b border-cream-200 dark:border-gray-700 transition-all duration-300`}>
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} overflow-hidden`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shrink-0">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div className={`transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"} overflow-hidden whitespace-nowrap`}>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">
              MedPredict
            </h1>
            <span className="text-[10px] font-semibold text-primary-600 tracking-wider uppercase">
              AI Diagnostics
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <HiOutlineXMark className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${collapsed ? "px-2" : "px-4"} py-6 space-y-1 transition-all duration-300`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={linkClass}
            onClick={onClose}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className={`transition-all duration-300 ${collapsed ? "w-0 opacity-0 hidden lg:inline-block lg:overflow-hidden" : "w-auto opacity-100"} overflow-hidden whitespace-nowrap`}>
              {item.label}
            </span>
          </NavLink>
        ))}

        {/* Admin link */}
        {user?.is_admin && (
          <NavLink
            to="/dashboard/admin"
            className={linkClass}
            onClick={onClose}
            title={collapsed ? "Admin Panel" : undefined}
          >
            <HiOutlineShieldCheck className="w-5 h-5 shrink-0" />
            <span className={`transition-all duration-300 ${collapsed ? "w-0 opacity-0 hidden lg:inline-block lg:overflow-hidden" : "w-auto opacity-100"} overflow-hidden whitespace-nowrap`}>
              Admin Panel
            </span>
          </NavLink>
        )}
      </nav>

      {/* Logout button */}
      <div className={`border-t border-cream-200 dark:border-gray-700 ${collapsed ? "px-2" : "px-4"} py-4 transition-all duration-300`}>
        <button
          onClick={handleLogout}
          title={collapsed ? "Log Out" : undefined}
          className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} w-full ${collapsed ? "px-0 py-3" : "px-4 py-3"} rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200`}
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5 shrink-0" />
          <span className={`transition-all duration-300 ${collapsed ? "w-0 opacity-0 hidden lg:inline-block lg:overflow-hidden" : "w-auto opacity-100"} overflow-hidden whitespace-nowrap`}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
}
