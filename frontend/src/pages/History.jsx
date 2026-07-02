import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";
import HistoryStats from "../components/HistoryStats";

import {
  getHistory,
  getAnalysis,
  deleteAnalysis,
  downloadReport,
} from "../services/api";

export default function History() {

  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {

    try {

      setLoading(true);

      const response = await getHistory();

      setHistory(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load history.");

    } finally {

      setLoading(false);

    }

  }

  async function handleView(id) {

    try {

      setLoadingAnalysis(true);

      const response = await getAnalysis(id);

      setSelectedAnalysis(response.data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {

      console.error(error);

      alert("Unable to load analysis.");

    } finally {

      setLoadingAnalysis(false);

    }

  }

  async function handleDelete(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) return;

    try {

      await deleteAnalysis(id);

      setHistory((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (
        selectedAnalysis &&
        selectedAnalysis.id === id
      ) {
        setSelectedAnalysis(null);
      }

      alert("Analysis deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to delete analysis.");

    }

  }

  async function handleDownload() {

    try {

      const response = await downloadReport();

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "AI_Career_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Unable to download report.");

    }

  }

  const filteredHistory = history.filter((item) => {

    const query = search.toLowerCase();

    const matchedSkills = item.matched_skills
      .join(" ")
      .toLowerCase();

    const missingSkills = item.missing_skills
      .join(" ")
      .toLowerCase();

    return (

      matchedSkills.includes(query) ||

      missingSkills.includes(query) ||

      item.match_score.toString().includes(query)

    );

  });

  if (loading) {

    return (

      <div className="min-h-screen bg-[#070B1A] text-white">

        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">

          <h2 className="text-3xl font-bold">
            Loading History...
          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#070B1A] text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {selectedAnalysis ? (

          <>

            <button
              onClick={() => setSelectedAnalysis(null)}
              className="mb-8 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
            >
              ← Back to History
            </button>

            <ResultCard result={selectedAnalysis} />

          </>

        ) : (

          <>

            <h1 className="text-5xl font-black mb-8">

              📜 Resume Analysis History

            </h1>

            <HistoryStats history={history} />

            <div className="mb-10">

              <input

                type="text"

                placeholder="🔍 Search by skill or ATS score..."

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

                className="
                  w-full
                  bg-[#111827]
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-cyan-500
                "

              />

            </div>

            {filteredHistory.length === 0 ? (

              <div className="text-center text-gray-400 text-2xl mt-20">

                No analyses found.

              </div>

            ) : (

              <div className="space-y-8">

                {filteredHistory.map((item) => (

                  <div
                    key={item.id}
                    className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-xl"
                  >

                    <div className="flex justify-between items-start flex-wrap gap-6">

                      <div>

                        <h2 className="text-3xl font-bold">

                          ATS Score: {item.match_score}%

                        </h2>

                        <p className="text-gray-400 mt-2">

                          {new Date(item.created_at).toLocaleString()}

                        </p>

                      </div>

                      <div className="flex gap-3 flex-wrap">

                        <button
                          onClick={() => handleView(item.id)}
                          disabled={loadingAnalysis}
                          className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
                        >
                          👁 View
                        </button>

                        <button
                          onClick={handleDownload}
                          className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
                        >
                          📄 Download
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>

                    <div className="mt-8">

                      <h3 className="text-green-400 font-semibold mb-3">

                        Matched Skills

                      </h3>

                      <div className="flex flex-wrap gap-3">

                        {item.matched_skills.map((skill, index) => (

                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-green-500/20 text-green-300"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>

                    </div>

                    <div className="mt-8">

                      <h3 className="text-yellow-400 font-semibold mb-3">

                        Missing Skills

                      </h3>

                      <div className="flex flex-wrap gap-3">

                        {item.missing_skills.map((skill, index) => (

                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

}




