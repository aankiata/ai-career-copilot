export default function ScoreCircle({ score }) {

  let color = "#06b6d4";
  let label = "Good Match";

  if (score >= 90) {
    color = "#22c55e";
    label = "Excellent";
  } else if (score >= 75) {
    color = "#3b82f6";
    label = "Strong";
  } else if (score >= 60) {
    color = "#f59e0b";
    label = "Average";
  } else {
    color = "#ef4444";
    label = "Needs Improvement";
  }

  return (

    <div className="flex flex-col items-center">

      <div
        className="w-56 h-56 rounded-full border-8 flex flex-col justify-center items-center"
        style={{
          borderColor: color,
          color: color
        }}
      >

        <div className="text-6xl font-black">
          {score}%
        </div>

        <div className="text-gray-400 mt-2">
          {label}
        </div>

      </div>

    </div>

  );
}


