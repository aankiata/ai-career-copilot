import { useState } from "react";
import api from "../services/api";

export default function UploadResume({ setResume }) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await api.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResume(response.data.resume_text);
      setFileName(file.name);
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl mb-10">

      <h2 className="text-3xl font-bold mb-8 text-center">
        📄 Upload Your Resume
      </h2>

      <input
        id="resume-upload"
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="hidden"
      />

      <label
        htmlFor="resume-upload"
        className="
          flex
          flex-col
          justify-center
          items-center
          h-64
          border-2
          border-dashed
          border-cyan-500/40
          rounded-3xl
          cursor-pointer
          hover:border-cyan-400
          hover:bg-cyan-500/5
          transition-all
          duration-300
        "
      >
        <div className="text-7xl mb-4">
          📄
        </div>

        <h3 className="text-2xl font-bold">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-400 mt-3">
          or click to upload
        </p>

        <p className="text-sm text-gray-500 mt-6">
          PDF files only
        </p>
      </label>

      {uploading && (
        <div className="mt-6 text-center">

          <div className="inline-block h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-cyan-400 mt-4 font-semibold">
            Uploading Resume...
          </p>

        </div>
      )}

      {!uploading && fileName && (
        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4">

          <div className="text-green-400 font-semibold text-center">
            ✅ Resume uploaded successfully
          </div>

          <div className="text-center text-gray-300 mt-2 break-all">
            {fileName}
          </div>

        </div>
      )}
    </div>
  );
}

