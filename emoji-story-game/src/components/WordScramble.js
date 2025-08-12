import React from 'react';

const WordScramble = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4 tracking-tight">
            🔤 Word Scramble
          </h1>
          <p className="text-blue-200 text-lg font-light">
            Coming Soon!
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 mb-8 border border-white/10">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-2xl font-medium text-white mb-4">
            Under Development
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed">
            We're working hard to bring you an exciting word scramble game. 
            Players will unscramble letters to form meaningful words while racing against the clock.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="px-8 py-4 bg-white text-blue-900 text-lg font-medium rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105"
        >
          Back to Game Menu
        </button>
      </div>
    </div>
  );
};

export default WordScramble;
