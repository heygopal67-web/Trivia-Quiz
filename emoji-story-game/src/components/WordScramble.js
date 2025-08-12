import React from 'react';

const WordScramble = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2 tracking-tight">
            🔤 Word Scramble
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Coming Soon!
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-6 border border-slate-200">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
            Under Development
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We're working hard to bring you an exciting word scramble game. 
            Players will unscramble letters to form meaningful words while racing against the clock.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="px-8 py-3 bg-slate-900 text-white text-base md:text-lg font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          Back to Game Menu
        </button>
      </div>
    </div>
  );
};

export default WordScramble;
