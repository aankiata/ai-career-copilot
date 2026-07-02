import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      className="
        bg-[#111827]
        border
        border-white/10
        rounded-2xl
        p-6
        shadow-xl
        transition-all
      "
    >
      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-gray-400 text-lg">
        {title}
      </h3>

      <div
        className="text-5xl font-black mt-3"
        style={{ color }}
      >
        {value}
      </div>
    </motion.div>
  );
}



