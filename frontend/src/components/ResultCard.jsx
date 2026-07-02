import { motion } from "framer-motion";
import ScoreCircle from "./ScoreCircle";
import StatCard from "./StatCard";
import AnalyticsBar from "./AnalyticsBar";
import api from "../services/api";

export default function ResultCard({ result }) {

  async function downloadReport() {

    try {

      const response = await api.post(
        "/report/",
        result,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "AI_Career_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Failed to download report.");

    }

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#111827] rounded-3xl border border-white/10 p-10 shadow-2xl"
    >

      {/* Title */}

      <h2 className="text-5xl font-bold text-center mb-14">
        🤖 AI Analysis Report
      </h2>

      {/* Dashboard */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        <StatCard
          title="ATS Score"
          value={`${result.match_score}%`}
          icon="🎯"
          color="#22c55e"
        />

        <StatCard
          title="Strengths"
          value={result.strengths?.length ?? 0}
          icon="💪"
          color="#3b82f6"
        />

        <StatCard
          title="Matched Skills"
          value={result.matched_skills?.length ?? 0}
          icon="✅"
          color="#22c55e"
        />

        <StatCard
          title="Missing Skills"
          value={result.missing_skills?.length ?? 0}
          icon="📚"
          color="#f59e0b"
        />

      </div>

      {/* Strengths & Weaknesses */}

      <div className="grid lg:grid-cols-2 gap-10">

        <div>

          <h3 className="text-3xl font-bold text-green-400 mb-6">
            ✅ Strengths
          </h3>

          <div className="space-y-4">

            {result.strengths?.map((item, index) => (

              <div
                key={index}
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/20 transition"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="text-3xl font-bold text-red-400 mb-6">
            ❌ Weaknesses
          </h3>

          <div className="space-y-4">

            {result.weaknesses?.map((item, index) => (

              <div
                key={index}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 hover:bg-red-500/20 transition"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Matched Skills */}

      <div className="mt-16">

        <h3 className="text-3xl font-bold text-green-400 mb-6">
          🎯 Matched Skills
        </h3>

        <div className="flex flex-wrap gap-4">

          {result.matched_skills?.map((skill, index) => (

            <span
              key={index}
              className="px-5 py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20 transition"
            >
              ✓ {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Missing Skills */}

      <div className="mt-16">

        <h3 className="text-3xl font-bold text-yellow-400 mb-6">
          📚 Missing Skills
        </h3>

        <div className="flex flex-wrap gap-4">

          {result.missing_skills?.map((skill, index) => (

            <span
              key={index}
              className="px-5 py-3 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 transition"
            >
              ✗ {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Recommendations */}

      <div className="mt-16">

        <h3 className="text-3xl font-bold text-cyan-400 mb-6">
          💡 AI Recommendations
        </h3>

        <div className="space-y-4">

          {result.recommendations?.map((item, index) => (

            <div
              key={index}
              className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 hover:bg-cyan-500/20 transition"
            >
              <span className="text-cyan-300 font-bold mr-3">
                ✔
              </span>

              {item}

            </div>

          ))}

        </div>

      </div>

      {/* Resume Analytics */}

      <div className="mt-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          📊 Resume Analytics
        </h2>

        <AnalyticsBar
          title="Skill Match"
          value={result.analytics?.skill_match ?? 0}
          color="bg-green-500"
          icon="💪"
        />

        <AnalyticsBar
          title="Keyword Match"
          value={result.analytics?.keyword_match ?? 0}
          color="bg-blue-500"
          icon="🔑"
        />

        <AnalyticsBar
          title="Experience Match"
          value={result.analytics?.experience_match ?? 0}
          color="bg-yellow-500"
          icon="💼"
        />

        <AnalyticsBar
          title="Education Match"
          value={result.analytics?.education_match ?? 0}
          color="bg-purple-500"
          icon="🎓"
        />

        <AnalyticsBar
          title="Project Match"
          value={result.analytics?.project_match ?? 0}
          color="bg-cyan-500"
          icon="🚀"
        />

      </div>

      {/* Download Button */}

      <div className="flex justify-center mt-16">

        <button
          onClick={downloadReport}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl"
        >
          📄 Download AI Report
        </button>

      </div>

      {/* ATS Score */}

      <div className="mt-20 flex justify-center">

        <div className="text-center">

          <h2 className="text-4xl font-bold mb-8">
            ATS Match Score
          </h2>

          <ScoreCircle score={result.match_score} />

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            This score estimates how well your resume aligns with the job
            description. Improve the missing skills and recommendations to
            increase your ATS score.
          </p>

        </div>

      </div>

    </motion.div>

  );

}







