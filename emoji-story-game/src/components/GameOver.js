import React from 'react';

const GameOver = ({ score, onPlayAgain }) => {
  // Calculate performance rating based on score
  const getPerformanceRating = () => {
    if (score >= 150) return { text: '🏆 Legendary!', color: 'text-yellow-400' };
    if (score >= 100) return { text: '🌟 Excellent!', color: 'text-green-400' };
    if (score >= 50) return { text: '👍 Good Job!', color: 'text-blue-400' };
    if (score >= 25) return { text: '😊 Not Bad!', color: 'text-purple-400' };
    return { text: '💪 Keep Trying!', color: 'text-red-400' };
  };

  const performance = getPerformanceRating();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Game Over Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">🎮 Game Over!</h1>
          <div className={`text-3xl font-bold ${performance.color} mb-2`}>
            {performance.text}
          </div>
        </div>

        {/* Score Display */}
        <div className="bg-white bg-opacity-10 rounded-2xl p-8 mb-8 border border-white border-opacity-30">
          <h2 className="text-2xl font-semibold text-blue-200 mb-4">Final Score</h2>
          <div className="text-6xl font-bold text-white mb-2">
            {score}
          </div>
          <p className="text-blue-200 text-lg">points</p>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white bg-opacity-5 rounded-xl p-6 mb-8 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold text-white mb-4">How Scoring Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-blue-200">
            <div className="flex items-center space-x-3">
              <span className="text-green-400 text-2xl">✅</span>
              <span>Correct Answer: +10 points</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-blue-400 text-2xl">⏰</span>
              <span>Time Bonus: +remaining seconds</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-yellow-400 text-2xl">💡</span>
              <span>Hint Used: -5 points</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-red-400 text-2xl">⏱️</span>
              <span>Time's Up: +0 points</span>
            </div>
          </div>
        </div>

        {/* Play Again Button */}
        <div className="mb-8">
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            🎯 Play Again
          </button>
        </div>

        {/* Encouragement */}
        <div className="text-blue-200">
          <p className="text-lg">
            {score > 0 
              ? "Great job! Can you beat your score?" 
              : "Don't give up! Practice makes perfect!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
