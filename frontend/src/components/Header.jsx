function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <h1 className="text-2xl font-bold">

          <span className="text-violet-400">
            AI
          </span>

          Career Copilot

        </h1>

        <button
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
        >
          GitHub
        </button>

      </div>

    </header>
  );
}

export default Header;
