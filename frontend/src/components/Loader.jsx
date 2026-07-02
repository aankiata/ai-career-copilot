import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  "📄 Reading Resume...",
  "🧠 Extracting Skills...",
  "🎯 Matching Job Description...",
  "📊 Calculating ATS Score...",
  "🤖 Generating AI Recommendations..."
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#111827] rounded-3xl border border-white/10 p-10 shadow-2xl mt-12"
    >
      <div className="flex flex-col items-center">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="text-7xl"
        >
          🤖
        </motion.div>

        <h2 className="text-3xl font-bold mt-6">
          AI is Analyzing Your Resume
        </h2>

        <p className="text-gray-400 mt-2">
          Please wait a few seconds...
        </p>

        <div className="w-full bg-gray-700 rounded-full h-4 mt-10 overflow-hidden">

          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-4 rounded-full"
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.8,
            }}
          />

        </div>

        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-cyan-300 text-xl font-semibold"
        >
          {steps[step]}
        </motion.p>

      </div>
    </motion.div>
  );
}
