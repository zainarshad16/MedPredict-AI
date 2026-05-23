import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    const name = form.full_name.trim();
    if (!name) {
      errs.full_name = "Full name is required";
    } else if (name.length < 2) {
      errs.full_name = "Name must be at least 2 characters";
    } else if (name.length > 100) {
      errs.full_name = "Name must be under 100 characters";
    } else if (!/^[a-zA-Z\s.'"-]+$/.test(name)) {
      errs.full_name = "Name can only contain letters, spaces, and basic punctuation";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    } else if (form.password.length > 128) {
      errs.password = "Password must be under 128 characters";
    } else if (!/(?=.*[a-z])/.test(form.password)) {
      errs.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      errs.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(form.password)) {
      errs.password = "Password must contain at least one number";
    }

    if (!form.confirm) {
      errs.confirm = "Please confirm your password";
    } else if (form.password !== form.confirm) {
      errs.confirm = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form.email.trim(), form.full_name.trim(), form.password);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cream-100 via-cream-50 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-900 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <span className="text-3xl font-bold">M</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Join MedPredict AI</h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            Create your account to start leveraging AI-powered diagnostic tools
            for brain tumor detection and classification.
          </p>
        </div>
      </div>

      {/* Right form */}
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

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-8">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text" value={form.full_name} onChange={set("full_name")}
                minLength={2} maxLength={100}
                className={`w-full px-4 py-3 rounded-xl border ${errors.full_name ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Enter your full name (e.g. Dr. John Doe)"
              />
              {errors.full_name && <p className="text-red-500 text-xs mt-1.5">{errors.full_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email" value={form.email} onChange={set("email")}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Enter your email (e.g. doctor@hospital.com)"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password <span className="text-red-500">*</span></label>
              <input
                type="password" value={form.password} onChange={set("password")}
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Min 6 chars, 1 uppercase, 1 lowercase, 1 number"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
              <input
                type="password" value={form.confirm} onChange={set("confirm")}
                className={`w-full px-4 py-3 rounded-xl border ${errors.confirm ? "border-red-400 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
                placeholder="Re-enter your password to confirm"
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1.5">{errors.confirm}</p>}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
