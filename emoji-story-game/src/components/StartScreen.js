import React from 'react';

const StartScreen = ({ onStartGame, onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Back Button */}
        <div className="text-left mb-8">
          <button
            onClick={onBackToMenu}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
          >
            ← Back to Game Menu
          </button>
        </div>

        {/* Game Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-light text-white mb-4 tracking-tight">
            Guess the Movie: Emoji Quiz
          </h1>
          <p className="text-slate-300 text-lg font-light">
            Decode emoji sequences to reveal movies, people, and events
          </p>
        </div>

        {/* Example Puzzle */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Example</p>
          <div className="flex items-center justify-center space-x-6 text-5xl mb-4">
            <span>🧙‍♂️</span>
            <span>💍</span>
            <span>🌋</span>
          </div>
          <p className="text-white text-lg">Lord of the Rings</p>
        </div>

        {/* Quick Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-sm">
          <div className="text-slate-400">
            <span className="text-white font-medium">15s</span> per puzzle
          </div>
          <div className="text-slate-400">
            <span className="text-white font-medium">+10</span> points + time bonus
          </div>
          <div className="text-slate-400">
            <span className="text-white font-medium">-5</span> points for hints
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="px-12 py-4 bg-white text-slate-900 text-lg font-medium rounded-xl hover:bg-slate-100 transition-all duration-200 hover:scale-105"
        >
          Start Game
        </button>

        {/* Footer Note */}
        <p className="text-slate-500 text-xs mt-8">
          Add your API key in src/api.js for dynamic emojis
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
