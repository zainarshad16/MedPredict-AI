import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { HiOutlineCloudArrowUp, HiOutlineTrash } from "react-icons/hi2";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
  });
  const [avatar, setAvatar] = useState(() => localStorage.getItem("avatar") || null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onDrop = useCallback((accepted) => {
    if (accepted.length === 0) return;
    const file = accepted[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem("avatar", ev.target.result);
      toast.success("Profile picture updated");
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  const handleRemoveAvatar = () => {
    setAvatar(null);
    localStorage.removeItem("avatar");
    toast.success("Profile picture removed");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await updateProfile({ full_name: form.full_name.trim() });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Manage your account information
        </p>
      </div>

      {/* Avatar section — dropzone style */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Profile Picture
        </h3>

        {!avatar ? (
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
              <p className="text-primary-600 font-medium">Drop your photo here...</p>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Drag & drop a profile photo, or click to browse
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  JPG, PNG, GIF or WebP up to 2 MB
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={avatar}
              alt="Profile"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-cream-200 dark:border-gray-600 shadow-lg"
            />
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Profile photo uploaded
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  {...getRootProps()}
                  className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition cursor-pointer"
                >
                  <input {...getInputProps()} />
                  Change Photo
                </button>
                <button
                  onClick={handleRemoveAvatar}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  Remove
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                JPG, PNG, GIF or WebP up to 2 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          {avatar ? (
            <img src={avatar} alt="Profile" className="w-14 h-14 rounded-2xl object-cover shadow" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {user?.full_name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.full_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              {user?.is_admin ? "ADMIN" : "USER"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={form.full_name}
              onChange={(e) => {
                setForm((f) => ({ ...f, full_name: e.target.value }));
                if (errors.full_name) setErrors((er) => ({ ...er, full_name: "" }));
              }}
              placeholder="Enter your full name (e.g. Dr. John Doe)"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.full_name
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1.5">{errors.full_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Account info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Account Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Account ID</span>
            <span className="font-mono">{user?.id}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Member since</span>
            <span>{user?.created_at && new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Status</span>
            <span className="text-emerald-600 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
