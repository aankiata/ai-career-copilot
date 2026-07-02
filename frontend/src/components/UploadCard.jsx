export default function UploadCard({ resume, setResume }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-white mb-6">
        Resume
      </h2>

      <textarea
        rows={14}
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Paste your resume here..."
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
          focus:border-cyan-400
          transition
        "
      />
    </div>
  );
}



