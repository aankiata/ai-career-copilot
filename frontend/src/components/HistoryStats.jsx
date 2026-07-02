export default function HistoryStats({ history }) {
  const total = history.length;

  const scores = history.map((item) => item.match_score);

  const highest =
    scores.length > 0 ? Math.max(...scores) : 0;

  const lowest =
    scores.length > 0 ? Math.min(...scores) : 0;

  const average =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        )
      : 0;

  const stats = [
    {
      title: "Total Analyses",
      value: total,
      icon: "📄",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Highest ATS",
      value: `${highest}%`,
      icon: "🏆",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Average ATS",
      value: `${average}%`,
      icon: "📈",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Lowest ATS",
      value: `${lowest}%`,
      icon: "📉",
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-r ${stat.color} rounded-3xl p-6 shadow-xl`}
        >
          <div className="text-5xl mb-4">{stat.icon}</div>

          <div className="text-4xl font-black">
            {stat.value}
          </div>

          <div className="text-white/90 mt-2 text-lg">
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  );
}

