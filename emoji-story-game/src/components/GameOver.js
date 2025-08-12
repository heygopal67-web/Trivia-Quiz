import React from "react";

const GameOver = ({ score, onPlayAgain, onBackToMenu }) => {
  const getPerformanceRating = () => {
    if (score >= 150) return { text: "Legendary", color: "text-amber-400" };
    if (score >= 100) return { text: "Excellent", color: "text-emerald-400" };
    if (score >= 50) return { text: "Good Job", color: "text-blue-400" };
    if (score >= 25) return { text: "Not Bad", color: "text-purple-400" };
    return { text: "Keep Trying", color: "text-red-400" };
  };

  const performance = getPerformanceRating();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Game Over</h1>
          <div className={`text-base md:text-lg font-medium ${performance.color.replace('text-', 'text-')}`}>
            {performance.text}
          </div>
        </div>

        {/* Score Display */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200">
          <h2 className="text-slate-600 text-xs uppercase tracking-wider mb-2">
            Final Score
          </h2>
          <div className="text-5xl md:text-6xl font-semibold text-slate-900 mb-1">{score}</div>
          <p className="text-slate-600 text-sm">points</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onPlayAgain}
            className="w-full px-6 py-3 bg-slate-900 text-white text-base md:text-lg font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Play Again
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full px-6 py-3 bg-slate-100 text-slate-800 text-base md:text-lg font-medium rounded-lg hover:bg-slate-200 border border-slate-200"
          >
            Back to Game Menu
          </button>
        </div>

        {/* Encouragement */}
        <p className="text-slate-600 text-sm">
          {score > 0
            ? "Great job! Can you beat your score?"
            : "Don't give up! Practice makes perfect!"}
        </p>
      </div>
    </div>
  );
};

export default GameOver;
