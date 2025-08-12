import React from 'react';

const StartScreen = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4 animate-pulse">
            🎭 Guess the Emoji Story
          </h1>
          <p className="text-2xl text-blue-200">
            Decode emoji sequences to reveal movies, people, and events!
          </p>
        </div>

        {/* Game Preview */}
        <div className="bg-white bg-opacity-10 rounded-2xl p-8 mb-8 border border-white border-opacity-30">
          <h2 className="text-3xl font-bold text-white mb-6">How to Play</h2>
          
          {/* Example Puzzle */}
          <div className="mb-6">
            <p className="text-blue-200 text-lg mb-4">Example Puzzle:</p>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 border border-white border-opacity-30">
              <div className="flex items-center justify-center space-x-4 text-6xl mb-4">
                <span>🧙‍♂️</span>
                <span>💍</span>
                <span>🌋</span>
              </div>
              <p className="text-white text-lg font-semibold">Answer: Lord of the Rings</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">🎯 Objective</h3>
              <ul className="text-blue-200 space-y-2">
                <li>• Guess the answer before time runs out</li>
                <li>• Each puzzle has 15 seconds</li>
                <li>• Complete all 10 puzzles</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">🏆 Scoring</h3>
              <ul className="text-blue-200 space-y-2">
                <li>• Correct answer: +10 points</li>
                <li>• Time bonus: +remaining seconds</li>
                <li>• Hint used: -5 points</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-4xl mb-3">⏰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Timer Challenge</h3>
            <p className="text-blue-200">Race against the clock for bonus points</p>
          </div>
          
          <div className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Hints</h3>
            <p className="text-blue-200">Get help when you're stuck</p>
          </div>
          
          <div className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Beautiful UI</h3>
            <p className="text-blue-200">Modern design with smooth animations</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="mb-8">
          <button
            onClick={onStartGame}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-2xl font-bold rounded-2xl transition-all duration-300 hover:scale-110 transform shadow-2xl hover:shadow-3xl animate-bounce"
          >
            🚀 Start Game
          </button>
        </div>

        {/* Footer */}
        <div className="text-blue-200">
          <p className="text-lg">
            Ready to test your emoji decoding skills?
          </p>
          <p className="text-sm mt-2 opacity-75">
            Don't forget to add your API key in src/api.js for dynamic emojis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
