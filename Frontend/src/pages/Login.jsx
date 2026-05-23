import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cream-100 via-cream-50 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-900 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <span className="text-3xl font-bold">M</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">MedPredict AI</h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            Advanced brain tumor detection powered by deep learning. Upload an MRI scan and
            receive instant, AI-driven diagnostic insights.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              ["99.2%", "Accuracy"],
              ["50k+", "Scans"],
              ["<2s", "Speed"],
            ].map(([val, label]) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{val}</div>
                <div className="text-xs text-primary-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        {/* Theme toggle - top right */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">MedPredict AI</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-8">
            Enter your credentials to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((er) => ({ ...er, email: "" })); }}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Enter your email (e.g. doctor@hospital.com)"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((er) => ({ ...er, password: "" })); }}
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Enter your password (min 6 characters)"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
