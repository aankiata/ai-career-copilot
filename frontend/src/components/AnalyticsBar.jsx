import { motion } from "framer-motion";

export default function AnalyticsBar({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div className="mb-8">

      <div className="flex justify-between items-center mb-2">

        <div className="flex items-center gap-3">

          <span className="text-2xl">
            {icon}
          </span>

          <span className="text-lg font-semibold">
            {title}
          </span>

        </div>

        <span className="text-xl font-bold">
          {value}%
        </span>

      </div>

      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className={`h-4 rounded-full ${color}`}
        />

      </div>

    </div>
  );
}



