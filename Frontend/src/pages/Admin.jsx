import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlineShieldCheck } from "react-icons/hi2";

export default function Admin() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    if (!user?.is_admin) return;
    Promise.all([API.get("/admin/users"), API.get("/admin/scans")])
      .then(([u, s]) => {
        setUsers(u.data);
        setScans(s.data);
      })
      .catch(() => toast.error("Failed to load admin data"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (userId) => {
    if (!confirm("Delete this user and all their data?")) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      setUsers((u) => u.filter((x) => x.id !== userId));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed");
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/toggle-admin`);
      setUsers((u) =>
        u.map((x) => (x.id === userId ? { ...x, is_admin: !x.is_admin } : x))
      );
      toast.success("Admin status updated");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed");
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        You do not have admin privileges.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin-slow" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Manage users and view platform activity
        </p>
      </div>

      {/* Stat chips */}
      <div className="flex gap-4">
        <div className="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30">
          <span className="text-lg font-bold text-primary-700 dark:text-primary-300">{users.length}</span>
          <span className="text-sm text-primary-600 dark:text-primary-400 ml-2">Users</span>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30">
          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{scans.length}</span>
          <span className="text-sm text-emerald-600 dark:text-emerald-400 ml-2">Total Scans</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl p-1 w-fit">
        {["users", "scans"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === t
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
            }`}
          >
            {t === "users" ? "Users" : "All Scans"}
          </button>
        ))}
      </div>

      {/* Users table */}
      {tab === "users" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-cream-200 dark:border-gray-700 bg-cream-100 dark:bg-gray-800/50">
                <th className="px-6 py-3.5 font-medium">ID</th>
                <th className="px-6 py-3.5 font-medium">Name</th>
                <th className="px-6 py-3.5 font-medium">Email</th>
                <th className="px-6 py-3.5 font-medium">Role</th>
                <th className="px-6 py-3.5 font-medium">Joined</th>
                <th className="px-6 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-3.5 font-mono text-gray-700 dark:text-gray-300">#{u.id}</td>
                  <td className="px-6 py-3.5 text-gray-900 dark:text-white font-medium">{u.full_name}</td>
                  <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                      u.is_admin
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}>
                      {u.is_admin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3.5">
                    {u.id !== user.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleAdmin(u.id)}
                          className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                          title="Toggle admin"
                        >
                          <HiOutlineShieldCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                          title="Delete user"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scans table */}
      {tab === "scans" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-cream-200 dark:border-gray-700 bg-cream-100 dark:bg-gray-800/50">
                <th className="px-6 py-3.5 font-medium">Scan ID</th>
                <th className="px-6 py-3.5 font-medium">Prediction</th>
                <th className="px-6 py-3.5 font-medium">Confidence</th>
                <th className="px-6 py-3.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-3.5 font-mono text-gray-700 dark:text-gray-300">#{s.id}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      s.prediction === "No Tumor"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {s.prediction}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300">
                    {(s.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
