import React from 'react';

const MemoryGame = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-orange-900 p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4 tracking-tight">
            🧠 Memory Game
          </h1>
          <p className="text-orange-200 text-lg font-light">
            Coming Soon!
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 mb-8 border border-white/10">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-2xl font-medium text-white mb-4">
            Under Development
          </h2>
          <p className="text-orange-200 text-sm leading-relaxed">
            Challenge your memory with our exciting card matching game! 
            Find pairs, beat your best time, and improve your concentration skills.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="px-8 py-4 bg-white text-orange-900 text-lg font-medium rounded-xl hover:bg-orange-50 transition-all duration-200 hover:scale-105"
        >
          Back to Game Menu
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
