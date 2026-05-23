import { useTheme } from "../context/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center w-16 h-8 rounded-full bg-cream-200 dark:bg-gray-600 transition-colors duration-300 cursor-pointer p-1 ${className}`}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
          dark
            ? "translate-x-8 bg-gray-800"
            : "translate-x-0 bg-white"
        }`}
      >
        {dark ? (
          <HiOutlineMoon className="w-3.5 h-3.5 text-primary-400" />
        ) : (
          <HiOutlineSun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
