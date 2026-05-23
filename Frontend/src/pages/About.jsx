export default function About() {
  const specs = [
    { label: "Architecture", value: "Swin Transformer (Vision Transformer)" },
    { label: "Base Model", value: "microsoft/swin-tiny-patch4-window7-224" },
    { label: "Input Size", value: "224 x 224 x 3 (RGB)" },
    { label: "Classes", value: "Glioma, Meningioma, Pituitary, No Tumor" },
    { label: "Training Data", value: "~7,000 MRI images (augmented)" },
    { label: "Patch Size", value: "4 x 4" },
    { label: "Framework", value: "PyTorch / HuggingFace Transformers" },
    { label: "Inference Time", value: "< 2 seconds" },
  ];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          About the AI Model
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Technical details of the brain tumor classification engine
        </p>
      </div>

      {/* Overview card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold mb-3">MedPredict AI Engine v2.0</h2>
        <p className="text-primary-100 leading-relaxed">
          Our AI model uses a Swin Transformer (Shifted Window Transformer) trained on thousands of
          brain MRI scans. It can classify images into four categories: Glioma, Meningioma,
          Pituitary tumors, and No Tumor, with high accuracy and sub-second inference speed.
        </p>
      </div>

      {/* Specs table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-cream-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Model Specifications
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {specs.map((s) => (
            <div key={s.label} className="px-6 py-4 flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.label}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cream-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Upload", desc: "Upload brain MRI scan" },
            { step: "2", title: "Preprocess", desc: "Resize, normalize, augment" },
            { step: "3", title: "Inference", desc: "Swin Transformer predicts class" },
            { step: "4", title: "Report", desc: "PDF report generated" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-700 dark:text-primary-400 font-bold">
                  {s.step}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {s.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
          Important Disclaimer
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          This AI tool is designed for research and informational purposes only. It is not a
          replacement for professional medical diagnosis. Always consult a qualified radiologist
          or healthcare provider for clinical decisions.
        </p>
      </div>
    </div>
  );
}
