export default function AnalyzeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      bg-gradient-to-r
      from-cyan-500
      to-purple-600
      px-12
      py-5
      rounded-2xl
      text-xl
      font-bold
      transition
      hover:scale-105
      hover:shadow-[0_0_40px_rgba(124,58,237,.5)]
      "
    >
      Analyze Resume 🚀
    </button>
  );
}

