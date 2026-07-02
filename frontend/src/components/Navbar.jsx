import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  return (

    <nav className="bg-[#111827] border-b border-white/10 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          AI Career Copilot
        </Link>

        <div className="flex gap-8">

          <Link
            to="/"
            className={`text-lg font-semibold transition ${
              location.pathname === "/"
                ? "text-cyan-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/history"
            className={`text-lg font-semibold transition ${
              location.pathname === "/history"
                ? "text-cyan-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            📜 History
          </Link>

        </div>

      </div>

    </nav>

  );

}

