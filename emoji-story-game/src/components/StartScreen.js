import React from 'react';

const StartScreen = ({ onStartGame, onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            onClick={onBackToMenu}
            className="px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
          >
            ← Back to Game Menu
          </button>
        </div>

        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2 tracking-tight">
            Guess the Movie: Emoji Quiz
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Decode emoji sequences to reveal movies, people, and events
          </p>
        </div>

        {/* Example Puzzle */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
          <p className="text-slate-600 text-xs uppercase tracking-wider mb-3">Example</p>
          <div className="flex items-center justify-center gap-5 text-4xl md:text-5xl mb-3">
            <span>🧙‍♂️</span>
            <span>💍</span>
            <span>🌋</span>
          </div>
          <p className="text-slate-900 text-base md:text-lg">Lord of the Rings</p>
        </div>

        {/* Quick Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
          <div className="text-slate-600">
            <span className="text-slate-900 font-medium">15s</span> per puzzle
          </div>
          <div className="text-slate-600">
            <span className="text-slate-900 font-medium">+10</span> points + time bonus
          </div>
          <div className="text-slate-600">
            <span className="text-slate-900 font-medium">Hints</span> always visible
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="px-8 py-3 bg-slate-900 text-white text-base md:text-lg font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          Start Game
        </button>

        {/* Footer Note */}
        <p className="text-slate-500 text-xs mt-6">
          Add your API key in `src/api.js` for dynamic emojis
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
