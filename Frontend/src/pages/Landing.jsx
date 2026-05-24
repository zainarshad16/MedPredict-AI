import { useState } from "react";
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
  HiOutlineGlobeAlt,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineHeart,
  HiOutlineCommandLine,
  HiOutlineBookOpen,
  HiOutlinePresentationChartLine,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowTrendingUp,
  HiOutlineEnvelope,
  HiOutlineCodeBracket,
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

const audiences = [
  {
    icon: HiOutlineAcademicCap,
    tag: "Students",
    title: "Learn medical AI hands-on",
    desc: "Medical, biomedical, and computer science students can explore real-world applications of vision transformers in healthcare imaging — without setting up a single line of code.",
    bullets: [
      "Run experiments on real MRI scans",
      "Visualize how the AI classifies images",
      "Generate PDF reports for assignments",
    ],
  },
  {
    icon: HiOutlineBeaker,
    tag: "Researchers",
    title: "Prototype faster",
    desc: "Use MedPredict AI as a baseline reference when prototyping medical imaging pipelines, comparing model behavior, or showcasing transformer-based classification.",
    bullets: [
      "Inspect class probabilities per scan",
      "Maintain a personal scan history",
      "Export structured PDF outputs",
    ],
  },
  {
    icon: HiOutlineLightBulb,
    tag: "Educators",
    title: "Teach with a live demo",
    desc: "Lecturers and instructors can use MedPredict AI as an interactive classroom demo to illustrate concepts like preprocessing, transformer attention, and confidence scores.",
    bullets: [
      "Project predictions live in class",
      "Discuss model limitations openly",
      "Encourage critical thinking on AI",
    ],
  },
  {
    icon: HiOutlineHeart,
    tag: "Curious Learners",
    title: "Explore safely",
    desc: "If you're simply curious about how AI can read a brain scan, MedPredict AI offers a guided experience with clear explanations, gentle visuals, and honest disclaimers.",
    bullets: [
      "Friendly, jargon-light interface",
      "Confidence scores you can understand",
      "Clear safety guidance throughout",
    ],
  },
];

const showcase = [
  {
    step: "Step 1",
    title: "Sign up in seconds",
    desc: "Create your free MedPredict AI account with just an email and password. No credit card. No long forms. You're ready to scan in under a minute.",
  },
  {
    step: "Step 2",
    title: "Open the scan workspace",
    desc: "Once logged in, navigate to the New Scan page. You'll see a clean drag-and-drop area, ready to accept your MRI image.",
  },
  {
    step: "Step 3",
    title: "Watch the AI think",
    desc: "After upload, the model preprocesses your image and runs inference. A subtle loading animation reassures you the pipeline is at work behind the scenes.",
  },
  {
    step: "Step 4",
    title: "Review your result",
    desc: "Within seconds, you'll see the predicted tumor class, a confidence percentage, and a friendly explanation of what the result means.",
  },
  {
    step: "Step 5",
    title: "Export and share",
    desc: "Download a polished PDF report containing the scan, prediction, confidence score, and timestamp — perfect for coursework, research notes, or personal records.",
  },
  {
    step: "Step 6",
    title: "Review your history",
    desc: "Every scan you run is saved to your personal history. Filter, search, and revisit past results whenever you need them.",
  },
];

const performance = [
  {
    metric: "Validation Accuracy",
    value: "98%+",
    desc: "Achieved on the held-out validation split of the augmented MRI dataset.",
  },
  {
    metric: "Inference Latency",
    value: "< 2s",
    desc: "Average end-to-end response time, including preprocessing and PDF report generation.",
  },
  {
    metric: "Classes Supported",
    value: "4",
    desc: "Glioma, Meningioma, Pituitary, and No Tumor — covering the most common categories.",
  },
  {
    metric: "Training Images",
    value: "~7,000",
    desc: "Curated and augmented MRI images used during fine-tuning of the Swin Transformer.",
  },
  {
    metric: "Model Parameters",
    value: "~28M",
    desc: "Compact yet powerful Swin-Tiny backbone, optimized for speed and quality.",
  },
  {
    metric: "Image Resolution",
    value: "224 px",
    desc: "All scans are resized to 224x224 RGB before being passed to the model.",
  },
];

const comparison = [
  {
    feature: "Free to use",
    medpredict: true,
    typical: false,
    detail: "No subscription or paywall for basic features.",
  },
  {
    feature: "Instant results",
    medpredict: true,
    typical: false,
    detail: "Predictions in under 2 seconds, not hours or days.",
  },
  {
    feature: "PDF report export",
    medpredict: true,
    typical: false,
    detail: "Auto-generated, shareable diagnostic-style reports.",
  },
  {
    feature: "Confidence scores",
    medpredict: true,
    typical: false,
    detail: "Every prediction includes a transparent confidence value.",
  },
  {
    feature: "Personal scan history",
    medpredict: true,
    typical: false,
    detail: "All your scans saved securely in one place.",
  },
  {
    feature: "Dark mode",
    medpredict: true,
    typical: false,
    detail: "A calming, eye-friendly UI day or night.",
  },
];

const testimonials = [
  {
    quote:
      "MedPredict AI is exactly the kind of hands-on tool I wish I had when I was learning about medical imaging. Clean interface, fast results, honest disclaimers.",
    name: "Dr. A. Khan",
    role: "Radiology Educator",
  },
  {
    quote:
      "We use it as a baseline reference when discussing transformer-based classification in our seminars. The confidence scores spark great conversations.",
    name: "M. Lee",
    role: "Biomedical Researcher",
  },
  {
    quote:
      "Finally a brain MRI demo that actually feels approachable. Uploading my first scan and seeing the result took less than a minute.",
    name: "S. Patel",
    role: "Medical Student",
  },
];

const glossary = [
  {
    term: "MRI",
    desc: "Magnetic Resonance Imaging — a non-invasive technique that uses powerful magnets and radio waves to capture detailed images of soft tissue, including the brain.",
  },
  {
    term: "Glioma",
    desc: "A type of tumor that originates in the glial cells of the brain or spinal cord. Gliomas range from low-grade to highly aggressive.",
  },
  {
    term: "Meningioma",
    desc: "A typically slow-growing tumor that forms on the meninges — the protective membranes surrounding the brain and spinal cord.",
  },
  {
    term: "Pituitary Tumor",
    desc: "An abnormal growth in the pituitary gland that can affect hormone production and surrounding neural structures.",
  },
  {
    term: "Vision Transformer",
    desc: "A neural network architecture that applies the transformer mechanism — originally designed for language — to image data.",
  },
  {
    term: "Swin Transformer",
    desc: "A hierarchical vision transformer that uses shifted windows to efficiently capture both local detail and global context in images.",
  },
  {
    term: "Confidence Score",
    desc: "A number between 0 and 1 (or 0% and 100%) indicating how certain the model is about its prediction. Higher does not necessarily mean correct.",
  },
  {
    term: "Inference",
    desc: "The process of running a trained AI model on new data to produce a prediction.",
  },
];

const safetyPoints = [
  {
    icon: HiOutlineShieldCheck,
    title: "Not a medical device",
    desc: "MedPredict AI is a research and educational tool. It is not approved by any regulatory body for clinical diagnosis or treatment decisions.",
  },
  {
    icon: HiOutlineXCircle,
    title: "Do not self-diagnose",
    desc: "If you have any health concerns, please consult a qualified medical professional. Never rely solely on an AI prediction to make decisions about your health.",
  },
  {
    icon: HiOutlineLockClosed,
    title: "Your data, your control",
    desc: "Uploaded scans are tied only to your account. You can review or delete your history at any time from your dashboard.",
  },
  {
    icon: HiOutlineCheckCircle,
    title: "Honest about limitations",
    desc: "The model can be wrong. It can be uncertain. We surface confidence scores precisely so you can think critically about every result.",
  },
];

const journey = [
  {
    year: "Idea",
    title: "Why brain tumors?",
    desc: "Brain tumors are among the most clinically critical conditions where timely interpretation of MRI scans matters. We chose this domain to showcase how modern AI can support — not replace — expert workflows.",
  },
  {
    year: "Research",
    title: "Choosing the right model",
    desc: "After evaluating CNNs, hybrid models, and several transformer variants, the Swin Transformer offered the best balance of accuracy, speed, and interpretability for our use case.",
  },
  {
    year: "Build",
    title: "From notebook to product",
    desc: "We wrapped the model in a clean FastAPI backend, a modern React frontend, secure authentication, scan history, and PDF report generation — all designed to feel polished and trustworthy.",
  },
  {
    year: "Today",
    title: "Open to the world",
    desc: "MedPredict AI is now available online so anyone curious about medical AI can experience it firsthand, responsibly and safely.",
  },
];

export default function Landing() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-cream-200 dark:border-gray-800 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-primary-700 dark:text-primary-400">MedPredict AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
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

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-cream-200 dark:border-gray-800 px-4 py-4 flex flex-col gap-3 sm:hidden z-50 shadow-lg">
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
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

      {/* Mission / Intro narrative */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
                <HiOutlineGlobeAlt className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Making medical AI approachable for everyone
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-5 leading-relaxed">
                MedPredict AI was created with a simple goal in mind: take the
                latest advances in deep learning &mdash; specifically vision
                transformers &mdash; and turn them into something anyone can
                explore, learn from, and trust. We believe that medical AI
                should not live behind closed doors. It should be visible,
                understandable, and used responsibly.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                Whether you're a student stepping into the world of healthcare
                imaging, a researcher prototyping ideas, or simply someone
                curious about how AI can interpret a brain MRI, this platform
                is built for you. Every design choice &mdash; from the calm
                color palette to the transparent confidence scores &mdash; is
                meant to encourage understanding, not replace expertise.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                This is not a magic black box. It is a carefully fine-tuned
                Swin Transformer wrapped in a thoughtful interface, with clear
                disclaimers, predictable behavior, and a strong focus on
                educational value.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-primary-50 to-cream-100 dark:from-primary-900/20 dark:to-gray-800 rounded-3xl p-8 border border-cream-200 dark:border-gray-700">
                <div className="space-y-6">
                  {[
                    {
                      icon: HiOutlineLightBulb,
                      label: "Approachable",
                      desc: "Designed so a non-expert can use it confidently.",
                    },
                    {
                      icon: HiOutlineShieldCheck,
                      label: "Responsible",
                      desc: "Clear disclaimers and confidence scores throughout.",
                    },
                    {
                      icon: HiOutlineSparkles,
                      label: "Modern",
                      desc: "Built on a state-of-the-art vision transformer.",
                    },
                  ].map((m) => (
                    <div key={m.label} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                        <m.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {m.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {m.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

      {/* Who is it for */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineUserGroup className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Who It's For
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Designed for explorers of medical AI
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              MedPredict AI is welcoming to a wide range of users. Whoever you
              are, the interface adapts to your level of curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((a) => (
              <div
                key={a.tag}
                className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-cream-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <a.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-cream-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {a.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {a.desc}
                </p>
                <ul className="mt-4 space-y-2">
                  {a.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <HiOutlineCheckCircle className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step product walkthrough */}
      <section className="px-6 md:px-12 pb-20 bg-cream-100/50 dark:bg-gray-800/30">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineCommandLine className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Product Walkthrough
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What your first scan looks like
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Here's a quick walkthrough of what your journey through
              MedPredict AI will feel like, from the moment you sign up to the
              moment you download your first report.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-primary-200 dark:bg-primary-800/50 hidden sm:block" />
            <div className="space-y-6">
              {showcase.map((s, i) => (
                <div
                  key={s.step}
                  className="relative flex flex-col sm:flex-row gap-5 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700"
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center shadow-md shadow-primary-500/20">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400 mb-1">
                      {s.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Model performance metrics */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Model Performance
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Numbers that tell the story
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              A snapshot of how our Swin Transformer model performs on the
              brain MRI classification task. Higher accuracy. Lower latency.
              Clear specs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {performance.map((p) => (
              <div
                key={p.metric}
                className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-cream-200 dark:border-gray-700 relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-100/50 dark:bg-primary-900/20 blur-2xl" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                    {p.metric}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                    {p.value}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlinePresentationChartLine className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Why MedPredict AI
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How we compare
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              A simple side-by-side look at what you get with MedPredict AI vs.
              a typical academic demo or paywalled service.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-4 border-b border-cream-200 dark:border-gray-700 bg-cream-50 dark:bg-gray-800/50">
              <div className="col-span-6 text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Feature
              </div>
              <div className="col-span-3 text-xs uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400 text-center">
                MedPredict AI
              </div>
              <div className="col-span-3 text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 text-center">
                Typical Demo
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {comparison.map((c) => (
                <div
                  key={c.feature}
                  className="grid grid-cols-12 px-6 py-4 items-center"
                >
                  <div className="col-span-6">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {c.feature}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {c.detail}
                    </div>
                  </div>
                  <div className="col-span-3 flex justify-center">
                    {c.medpredict ? (
                      <HiOutlineCheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <HiOutlineXCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    {c.typical ? (
                      <HiOutlineCheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <HiOutlineXCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What early users are saying
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Educators, researchers, and students who've explored MedPredict
              AI share their first impressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-cream-200 dark:border-gray-700 flex flex-col"
              >
                <div className="text-5xl leading-none text-primary-200 dark:text-primary-900 font-serif select-none">
                  &ldquo;
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 -mt-2">
                  {t.quote}
                </p>
                <div className="mt-6 pt-4 border-t border-cream-200 dark:border-gray-700">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="px-6 md:px-12 pb-20 bg-cream-100/50 dark:bg-gray-800/30">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineBookOpen className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Our Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How MedPredict AI came to life
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              A quick look at the path from idea to launch &mdash; and where
              we're heading next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((j, i) => (
              <div
                key={j.year}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700"
              >
                <div className="text-xs uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  {j.year}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {j.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {j.desc}
                </p>
                <div className="absolute top-4 right-4 text-xs font-bold text-cream-200 dark:text-gray-700">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineMagnifyingGlass className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Quick Glossary
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Terms worth knowing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              A small reference to help you make the most of MedPredict AI,
              especially if you're new to medical imaging or vision
              transformers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {glossary.map((g) => (
              <div
                key={g.term}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-cream-200 dark:border-gray-700"
              >
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {g.term}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & ethics */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-cream-50 to-amber-50 dark:from-amber-900/10 dark:via-gray-800 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-10 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Safety, ethics, and honesty
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                We care deeply about responsible AI. Here's what you should
                know before you use MedPredict AI &mdash; in plain language.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {safetyPoints.map((p) => (
                <div
                  key={p.title}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Stay in touch */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-cream-200 dark:border-gray-700 p-10 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
              <HiOutlineEnvelope className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                Stay in Touch
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Want updates as MedPredict AI evolves?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
              We're constantly improving the model, expanding the feature set,
              and adding new educational content. Create your free account and
              you'll be the first to know when new capabilities arrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition shadow-md shadow-primary-500/20 text-center"
              >
                {user ? "Open Dashboard" : "Create Account"}
              </Link>
              <Link
                to={user ? "/dashboard/about" : "/login"}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
              >
                {user ? "Read More" : "Sign In"}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary-500" />
                <span>Free forever for learners</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack badge row */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 mb-4">
            <HiOutlineCodeBracket className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
              Built With
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            A modern, open stack
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
            We picked technologies that are reliable, well-documented, and
            loved by their communities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "PyTorch",
              "HuggingFace Transformers",
              "Swin Transformer",
              "FastAPI",
              "React",
              "Vite",
              "Tailwind CSS",
              "JWT Auth",
              "MongoDB",
              "ReportLab PDF",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-cream-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {tech}
              </span>
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
