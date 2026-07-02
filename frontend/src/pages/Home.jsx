import { useState } from "react";

import Navbar from "../components/Navbar";
import UploadResume from "../components/UploadResume";
import UploadCard from "../components/UploadCard";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";

import api from "../services/api";

export default function Home() {

  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleAnalyze() {

    if (!resume || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post("/analyze/", {
        resume,
        job_description: jobDescription,
      });

      setResult(response.data.data);

    } catch (error) {

      console.error("Analyze Error:", error);

      if (error.response) {

        alert(
          error.response.data.detail ||
          "Analysis failed."
        );

      } else {

        alert("Unable to connect to the backend.");

      }

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-[#070B1A] text-white">

      {/* Navbar */}

      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">

            🚀 AI Powered Resume Analysis

          </span>

          <h1 className="text-7xl font-black mt-10 leading-tight">

            Land More Interviews

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">

              with AI

            </span>

          </h1>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto">

            Upload your resume, paste a job description,
            and instantly receive an ATS score,
            matched skills, missing skills,
            personalized recommendations,
            and a professional AI report.

          </p>

        </div>

      </section>

      {/* Upload Resume */}

      <section className="max-w-7xl mx-auto px-6">

        <UploadResume setResume={setResume} />

      </section>

      {/* Resume + Job Description */}

      <section className="max-w-7xl mx-auto px-6 mt-8">

        <div className="grid md:grid-cols-2 gap-8">

          <UploadCard
            resume={resume}
            setResume={setResume}
          />

          <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">

              Job Description

            </h2>

            <textarea

              rows={14}

              value={jobDescription}

              onChange={(e) =>
                setJobDescription(e.target.value)
              }

              placeholder="Paste the job description here..."

              className="
                w-full
                bg-[#1F2937]
                rounded-2xl
                p-5
                border
                border-white/10
                outline-none
                resize-none
                text-white
                placeholder:text-gray-500
                focus:border-cyan-500
              "

            />

          </div>

        </div>

        {/* Analyze Button */}

        <div className="text-center mt-10">

          <button

            onClick={handleAnalyze}

            disabled={loading}

            className="
              px-14
              py-5
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              text-xl
              font-bold
              hover:scale-105
              transition-all
              duration-300
              shadow-xl
              disabled:opacity-50
            "

          >

            {loading ? "Analyzing..." : "🚀 Analyze Resume"}

          </button>

        </div>

      </section>

      {/* Loader */}

      {loading && (

        <section className="max-w-7xl mx-auto px-6 py-20">

          <Loader />

        </section>

      )}

      {/* Result */}

      {!loading && result && (

        <section className="max-w-7xl mx-auto px-6 py-20">

          <ResultCard result={result} />

        </section>

      )}

    </div>

  );

}







