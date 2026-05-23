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

      {/* Stats strip */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 md:p-12 shadow-xl shadow-primary-500/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-primary-100 mt-2 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we detect */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineBeaker className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Diagnostic Categories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Four classes the AI can recognize
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              MedPredict AI is trained to distinguish between three of the most
              common brain tumor types and healthy scans, helping you quickly
              understand what the model sees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tumorClasses.map((t) => (
              <div
                key={t.name}
                className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${t.color}`}
                />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${t.badge}`}
                  >
                    Class
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 pb-20 bg-cream-100/50 dark:bg-gray-800/30">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How MedPredict AI works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              From upload to diagnostic report in just four simple steps. The
              entire pipeline runs in seconds, powered by a modern vision
              transformer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((w) => (
              <div
                key={w.step}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-3 -right-3 text-5xl font-bold text-primary-100 dark:text-primary-900/40 select-none">
                  {w.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 relative">
                  <w.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 relative">
                  {w.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed relative">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Built with care, designed for clarity
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              We combine modern AI research with thoughtful design to deliver
              a tool that is both powerful and easy to understand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustPoints.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology highlight */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-cream-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
                  <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                    The Technology
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Powered by Swin Transformer
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                  MedPredict AI is built on the Swin Transformer, a hierarchical
                  vision transformer that uses shifted windows to efficiently
                  model both local and global patterns in medical images. The
                  base checkpoint is fine-tuned on a curated dataset of
                  thousands of labeled brain MRI scans.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "microsoft/swin-tiny-patch4-window7-224 backbone",
                    "Fine-tuned on ~7,000 augmented MRI images",
                    "PyTorch and HuggingFace Transformers stack",
                    "Sub-second inference on standard hardware",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-10 md:p-12 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary-300/30 blur-3xl" />
                </div>
                <div className="relative grid grid-cols-2 gap-4 text-white">
                  {[
                    { k: "Patch", v: "4 x 4" },
                    { k: "Input", v: "224 px" },
                    { k: "Classes", v: "4" },
                    { k: "Framework", v: "PyTorch" },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10"
                    >
                      <div className="text-xs uppercase tracking-wider text-primary-100">
                        {s.k}
                      </div>
                      <div className="text-xl font-bold mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineQuestionMarkCircle className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Frequently asked questions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6 open:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-base font-semibold text-gray-900 dark:text-white pr-4">
                    {f.q}
                  </span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-gray-900 to-primary-900 dark:from-gray-950 dark:to-primary-950 p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-700/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Ready to explore AI-driven medical imaging?
            </h2>
            <p className="text-primary-100 mt-4 max-w-2xl mx-auto leading-relaxed">
              Create a free account and start analyzing brain MRI scans in
              under a minute. No installation, no setup &mdash; just upload and
              go.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link
                to={user ? "/dashboard/scan" : "/register"}
                className="px-8 py-3.5 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition shadow-lg"
              >
                {user ? "Open Dashboard" : "Create Free Account"}
              </Link>
              <Link
                to={user ? "/dashboard/about" : "/login"}
                className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                {user ? "Learn More" : "Sign In"}
              </Link>
            </div>
            <p className="text-xs text-primary-200/80 mt-8">
              For research and educational use only. Not a substitute for
              professional medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        MedPredict AI &mdash; For research and educational purposes only. Not a medical device.
      </footer>
    </div>
  );
}
