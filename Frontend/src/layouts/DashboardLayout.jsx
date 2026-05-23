import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);      // mobile overlay
  const [collapsed, setCollapsed] = useState(false);           // desktop icon-only

  const toggleSidebar = () => {
    // lg+ → collapse/expand; smaller → open/close overlay
    if (window.innerWidth >= 1024) {
      setCollapsed((c) => !c);
    } else {
      setSidebarOpen((o) => !o);
    }
  };

  return (
    <div className="flex h-screen bg-cream-50 dark:bg-gray-900 transition-colors">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
