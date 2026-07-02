export default function JobDescription({
  jobDescription,
  setJobDescription,
}) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Job Description
      </h2>

      <textarea
        rows={12}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
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
        focus:border-cyan-400
        "
      />
    </div>
  );
}

