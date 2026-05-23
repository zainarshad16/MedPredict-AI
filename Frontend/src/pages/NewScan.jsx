import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import API from "../api/axios";
import toast from "react-hot-toast";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentArrowDown,
  HiOutlineArrowPath,
} from "react-icons/hi2";

const BAR_COLORS = ["#ef4444", "#f59e0b", "#10b981", "#6366f1"];

export default function NewScan() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) {
      const f = accepted[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await API.post("/scans/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
      toast.success("Analysis complete!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!result) return;
    try {
      const response = await API.get(`/scans/report/${result.id}`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MedPredict_Report_${result.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Report download failed");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const chartData = result
    ? Object.entries(result.probabilities).map(([name, value]) => ({
        name,
        probability: +(value * 100).toFixed(1),
      }))
    : [];

  const isCancer = result && result.prediction !== "No Tumor";

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Brain Scan</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Upload an MRI image to analyze for brain tumors
        </p>
      </div>

      {/* Upload area */}
      {!result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
              isDragActive
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            }`}
          >
            <input {...getInputProps()} />
            <HiOutlineCloudArrowUp className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            {isDragActive ? (
              <p className="text-primary-600 font-medium">Drop the image here...</p>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Drag &amp; drop an MRI image, or click to browse
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  JPG, PNG, BMP, TIFF up to 10 MB
                </p>
              </>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={preview}
                alt="MRI preview"
                className="w-48 h-48 object-cover rounded-xl border border-cream-200 dark:border-gray-700 shadow"
              />
              <div className="flex-1 space-y-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">File:</span> {file.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Scan"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-12 text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin-slow mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Analysis in Progress
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Our deep learning model is processing your MRI scan...
          </p>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Result header */}
          <div
            className={`rounded-2xl p-6 border ${
              isCancer
                ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30"
                : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isCancer
                    ? "bg-red-100 dark:bg-red-900/30"
                    : "bg-emerald-100 dark:bg-emerald-900/30"
                }`}
              >
                <span className="text-2xl">{isCancer ? "\u26A0" : "\u2714"}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {result.prediction}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-cream-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <HiOutlineDocumentArrowDown className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
                >
                  <HiOutlineArrowPath className="w-4 h-4" />
                  New Scan
                </button>
              </div>
            </div>
          </div>

          {/* Chart + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MRI Image */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Uploaded MRI
              </h3>
              <img
                src={preview}
                alt="MRI"
                className="w-full h-64 object-contain rounded-xl bg-gray-50 dark:bg-gray-700/50"
              />
            </div>

            {/* Probability chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Class Probabilities
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="probability" radius={[0, 6, 6, 0]} barSize={28}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Probability detail cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chartData.map((item, i) => (
              <div
                key={item.name}
                className="bg-white dark:bg-gray-800 rounded-xl border border-cream-200 dark:border-gray-700 p-4 text-center"
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: BAR_COLORS[i] }}
                />
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.probability}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
