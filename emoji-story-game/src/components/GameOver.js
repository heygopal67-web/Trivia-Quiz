import React from "react";

const GameOver = ({ score, onPlayAgain, onBackToMenu, isMuted, onToggleMute }) => {
  const getPerformanceRating = () => {
    if (score >= 150) return { text: "Legendary", color: "text-amber-400" };
    if (score >= 100) return { text: "Excellent", color: "text-emerald-400" };
    if (score >= 50) return { text: "Good Job", color: "text-blue-400" };
    if (score >= 25) return { text: "Not Bad", color: "text-purple-400" };
    return { text: "Keep Trying", color: "text-red-400" };
  };

  const performance = getPerformanceRating();

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg.gif)' }}
      />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      <button
        onClick={onToggleMute}
        className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 backdrop-blur transition-colors text-sm border border-slate-200 shadow"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        <span aria-hidden>{isMuted ? '🔇' : '🔊'}</span>
      </button>

      <div className="max-w-lg mx-auto text-center rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl ring-1 ring-white/60 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Game Over</h1>
          <div className={`text-base md:text-lg font-medium ${performance.color.replace('text-', 'text-')}`}>
            {performance.text}
          </div>
        </div>

        {/* Score Display */}
        <div className="bg-white/50 backdrop-blur rounded-2xl p-6 mb-6 ring-1 ring-white/50 shadow">
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
