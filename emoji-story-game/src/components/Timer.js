import React from "react";

const Timer = ({ timeLeft }) => {
  const progress = (timeLeft / 15) * 100;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getBarColor = () => {
    if (timeLeft > 10) return "stroke-emerald-500";
    if (timeLeft > 5) return "stroke-amber-500";
    return "stroke-red-500";
  };

  return (
    <div className="flex items-center gap-2">
      {/* Circular Timer */}
      <div className="relative">
        <svg className="w-12 h-12 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className={getBarColor()}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>

        {/* Time remaining text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-sm font-bold ${
              timeLeft > 10
                ? "text-emerald-600"
                : timeLeft > 5
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {timeLeft}
          </span>
        </div>
      </div>
      <span className="text-slate-600 text-xs md:text-sm">seconds</span>
    </div>
  );
};

export default Timer;
