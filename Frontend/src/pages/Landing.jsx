import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import {
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineArrowUpTray,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { Activity } from 'lucide-react'

const features = [
  {
    icon: HiOutlineCpuChip,
    title: "AI-Powered Analysis",
    desc: "Swin Transformer model trained on thousands of MRI scans for accurate tumor classification.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "High Accuracy",
    desc: "High validation accuracy across four diagnostic categories using vision transformers.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "PDF Reports",
    desc: "Automatically generated professional medical-style diagnostic reports.",
  },
  {
    icon: HiOutlineClock,
    title: "Instant Results",
    desc: "Get prediction results in under 2 seconds with confidence scores.",
  },
];

const tumorClasses = [
  {
    name: "Glioma",
    color: "from-rose-500 to-rose-700",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
    desc: "Tumors arising from the brain's glial cells. They vary widely in aggressiveness and account for a significant share of primary brain tumors.",
  },
  {
    name: "Meningioma",
    color: "from-amber-500 to-amber-700",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
    desc: "Typically slow-growing tumors that develop from the meninges, the membranes surrounding the brain and spinal cord. Often benign but require monitoring.",
  },
  {
    name: "Pituitary",
    color: "from-violet-500 to-violet-700",
    badge: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300",
    desc: "Tumors located in the pituitary gland that can affect hormone production and surrounding neural structures, including the optic nerves.",
  },
  {
    name: "No Tumor",
    color: "from-emerald-500 to-emerald-700",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
    desc: "MRI scans showing no detectable tumor. The model is trained to confidently distinguish healthy tissue from pathological findings.",
  },
];

const workflow = [
  {
    icon: HiOutlineArrowUpTray,
    step: "01",
    title: "Upload MRI Scan",
    desc: "Drag and drop a JPEG or PNG brain MRI image. Your scan is uploaded securely over an encrypted connection.",
  },
  {
    icon: HiOutlineSparkles,
    step: "02",
    title: "AI Preprocessing",
    desc: "The image is resized to 224x224, normalized, and prepared for the Swin Transformer model pipeline.",
  },
  {
    icon: HiOutlineCpuChip,
    step: "03",
    title: "Vision Transformer Inference",
    desc: "Our fine-tuned Swin Transformer analyzes the scan, producing class probabilities across four diagnostic categories.",
  },
  {
    icon: HiOutlineDocumentText,
    step: "04",
    title: "Download Your Report",
    desc: "Receive a polished PDF report with the predicted class, confidence score, and scan metadata in seconds.",
  },
];

const stats = [
  { value: "4", label: "Diagnostic Classes" },
  { value: "<2s", label: "Average Inference" },
  { value: "7K+", label: "Training Images" },
  { value: "24/7", label: "Available Online" },
];

const trustPoints = [
  {
    icon: HiOutlineLockClosed,
    title: "Private & Secure",
    desc: "Your scans and reports are linked only to your account. Communication is protected with industry-standard encryption.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Research-Grade Model",
    desc: "Built on Microsoft's Swin Transformer architecture, the same family of vision transformers used in modern computer vision research.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Transparent Confidence",
    desc: "Every prediction comes with a confidence score so you understand how certain the model is about its diagnosis.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Built for Everyone",
    desc: "Designed for students, researchers, and curious learners exploring medical AI — with a clean and approachable interface.",
  },
];

const faqs = [
  {
    q: "Is MedPredict AI a replacement for a doctor?",
    a: "No. MedPredict AI is a research and educational tool. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified radiologist or healthcare provider for any clinical decision.",
  },
  {
    q: "What kind of images does it accept?",
    a: "The model is trained on brain MRI scans (typically axial slices). For best results, upload clear JPEG or PNG MRI images. Non-MRI images or images of other body parts may produce unreliable predictions.",
  },
  {
    q: "How accurate is the model?",
    a: "Our Swin Transformer model achieves high validation accuracy across the four classes on the dataset it was trained on. Real-world accuracy will depend on image quality and how similar the input is to the training distribution.",
  },
  {
    q: "Is my data shared with anyone?",
    a: "No. Your uploaded scans and generated reports are tied to your account and are not shared with third parties. They are used to power your personal scan history.",
  },
  {
    q: "Do I need to install anything?",
    a: "No installation is required. MedPredict AI runs entirely in your browser. Just create an account, sign in, and start scanning.",
  },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-cream-200 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-primary-700 dark:text-primary-400">MedPredict AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            AI-Powered Medical Imaging
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          Brain Tumor Detection
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            Powered by AI
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
          Upload an MRI scan and receive instant AI-driven diagnostic insights. Our deep
          learning model classifies brain tumors with clinical-grade accuracy.
        </p>
        <div className="flex justify-center gap-4 mt-10">
          <Link
            to={user ? "/dashboard/scan" : "/register"}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
          >
            Start Scanning
          </Link>
          <Link
            to={user ? "/dashboard/about" : "/login"}
            className="px-8 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        MedPredict AI &mdash; For research and educational purposes only. Not a medical device.
      </footer>
    </div>
  );
}
