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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-lg mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4">Game Over</h1>
          <div className={`text-xl font-medium ${performance.color}`}>
            {performance.text}
          </div>
        </div>

        {/* Score Display */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
          <h2 className="text-slate-300 text-sm uppercase tracking-wider mb-2">
            Final Score
          </h2>
          <div className="text-6xl font-light text-white mb-1">{score}</div>
          <p className="text-slate-400 text-sm">points</p>
        </div>

        {/* Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={onPlayAgain}
            className="w-full px-8 py-4 bg-white text-slate-900 text-lg font-medium rounded-xl hover:bg-slate-100 transition-all duration-200 hover:scale-105"
          >
            Play Again
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full px-8 py-4 bg-slate-600 text-white text-lg font-medium rounded-xl hover:bg-slate-500 transition-all duration-200"
          >
            Back to Game Menu
          </button>
        </div>

        {/* Encouragement */}
        <p className="text-slate-400 text-sm">
          {score > 0
            ? "Great job! Can you beat your score?"
            : "Don't give up! Practice makes perfect!"}
        </p>
      </div>
    </div>
  );
};

export default GameOver;
