import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/scans/history")
      .then((r) => setScans(r.data))
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false));
  }, []);

  const downloadReport = async (scanId) => {
    try {
      const res = await API.get(`/scans/report/${scanId}`, { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MedPredict_Report_${scanId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Report not available");
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan History</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          All your past brain scan analyses
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-hidden">
        {scans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-cream-200 dark:border-gray-700 bg-cream-100 dark:bg-gray-800/50">
                  <th className="px-6 py-3.5 font-medium">Scan ID</th>
                  <th className="px-6 py-3.5 font-medium">Date</th>
                  <th className="px-6 py-3.5 font-medium">Prediction</th>
                  <th className="px-6 py-3.5 font-medium">Confidence</th>
                  <th className="px-6 py-3.5 font-medium">Report</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan) => (
                  <tr
                    key={scan.id}
                    className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                  >
                    <td className="px-6 py-4 font-mono text-gray-700 dark:text-gray-300">
                      MED-{String(scan.id).padStart(6, "0")}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(scan.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full max-w-[100px]">
                          <div
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${scan.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {(scan.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => downloadReport(scan.id)}
                        className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        <HiOutlineDocumentArrowDown className="w-4 h-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-lg">No scans found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Upload an MRI scan to see your history here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
