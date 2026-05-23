import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineExclamationTriangle,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/scans/stats")
      .then((r) => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin-slow" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Scans",
      value: stats?.total_scans ?? 0,
      icon: HiOutlineDocumentMagnifyingGlass,
      color: "from-primary-500 to-primary-700",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
    {
      title: "No Cancer",
      value: stats?.no_cancer ?? 0,
      icon: HiOutlineShieldCheck,
      color: "from-emerald-500 to-emerald-700",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Cancer Detected",
      value: stats?.cancer_detected ?? 0,
      icon: HiOutlineExclamationTriangle,
      color: "from-red-500 to-red-700",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Overview of your brain scan analytics
          </p>
        </div>
        <Link
          to="/dashboard/scan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
        >
          New Scan <HiOutlineArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`${c.bg} rounded-2xl p-6 border border-cream-200 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{c.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.title}</div>
          </div>
        ))}
      </div>

      {/* Recent scans */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-cream-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Scans</h2>
        </div>
        {stats?.recent_scans?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Prediction</th>
                  <th className="px-6 py-3 font-medium">Confidence</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_scans.map((scan) => (
                  <tr key={scan.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-3.5 font-mono text-gray-700 dark:text-gray-300">#{scan.id}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          scan.prediction === "No Tumor"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {scan.prediction}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300">
                      {(scan.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                      {new Date(scan.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
            No scans yet. Upload your first MRI scan to get started.
          </div>
        )}
      </div>
    </div>
  );
}
