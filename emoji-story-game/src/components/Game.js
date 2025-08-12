import React, { useState, useEffect, useCallback } from 'react';
import { puzzles } from '../data';
import { fetchEmojisForKeywords } from '../api';
import Timer from './Timer';
import EmojiDisplay from './EmojiDisplay';
import AnswerInput from './AnswerInput';
import GameOver from './GameOver';

const Game = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [currentEmojis, setCurrentEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'gameOver'
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(''); // 'correct', 'incorrect', ''

  const currentPuzzleData = puzzles[currentPuzzleIndex];

  // Load puzzle and fetch emojis
  const loadPuzzle = useCallback(async () => {
    if (currentPuzzleIndex >= puzzles.length) {
      setGameState('gameOver');
      return;
    }

    setIsLoading(true);
    setShowHint(false);
    setFeedback('');
    setTimeLeft(15);

    try {
      const emojis = await fetchEmojisForKeywords(currentPuzzleData.keywords);
      setCurrentEmojis(emojis);
      setCurrentPuzzle(currentPuzzleData);
    } catch (error) {
      console.error('Error loading puzzle:', error);
      // Use fallback emojis if API fails
      const fallbackEmojis = currentPuzzleData.keywords.map(keyword => {
        const fallbackMap = {
          'wizard': '🧙‍♂️', 'ring': '💍', 'volcano': '🌋',
          'spider': '🕷️', 'man': '👨', 'web': '🕸️',
          'star': '⭐', 'wars': '⚔️', 'lightsaber': '⚡',
          'bat': '🦇', 'gotham': '🏙️', 'iron': '🦾',
          'arc': '🏹', 'harry': '👓', 'potter': '🏺',
          'wand': '🪄', 'jedi': '⚔️', 'knight': '🤺',
          'force': '💫', 'super': '🦸', 'krypton': '🪐',
          'captain': '👨‍✈️', 'america': '🇺🇸', 'shield': '🛡️',
          'thor': '⚡', 'hammer': '🔨', 'asgard': '🏰'
        };
        return fallbackMap[keyword.toLowerCase()] || '❓';
      });
      setCurrentEmojis(fallbackEmojis);
      setCurrentPuzzle(currentPuzzleData);
    } finally {
      setIsLoading(false);
    }
  }, [currentPuzzleIndex, currentPuzzleData]);

  // Load puzzle on mount and when puzzle index changes
  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing' || isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - move to next puzzle
          handleTimeUp();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isLoading]);

  const handleTimeUp = () => {
    // Move to next puzzle without scoring
    setCurrentPuzzleIndex(prev => prev + 1);
  };

  const handleAnswerSubmit = (answer) => {
    if (!currentPuzzle) return;

    const isCorrect = answer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase().trim();
    
    if (isCorrect) {
      // Calculate score: 10 points + remaining time as bonus
      const timeBonus = timeLeft;
      const roundScore = 10 + timeBonus;
      setScore(prev => prev + roundScore);
      setFeedback('correct');
      
      // Show feedback briefly, then move to next puzzle
      setTimeout(() => {
        setCurrentPuzzleIndex(prev => prev + 1);
      }, 1000);
    } else {
      setFeedback('incorrect');
      // Clear feedback after 1 second
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setScore(prev => Math.max(0, prev - 5)); // Deduct 5 points, minimum 0
      setShowHint(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentPuzzleIndex(0);
    setScore(0);
    setGameState('playing');
    setTimeLeft(15);
    setShowHint(false);
    setFeedback('');
  };

  if (gameState === 'gameOver') {
    return <GameOver score={score} onPlayAgain={handlePlayAgain} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Guess the Emoji Story</h1>
          <p className="text-blue-200">Score: {score}</p>
        </div>

        {/* Timer */}
        <Timer timeLeft={timeLeft} />

        {/* Emoji Display */}
        <EmojiDisplay emojis={currentEmojis} feedback={feedback} />

        {/* Answer Input */}
        <AnswerInput onSubmit={handleAnswerSubmit} feedback={feedback} />

        {/* Hint Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleHint}
            disabled={showHint}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              showHint
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105'
            }`}
          >
            {showHint ? 'Hint Used' : 'Get Hint (-5 points)'}
          </button>
        </div>

        {/* Hint Display */}
        {showHint && currentPuzzle && (
          <div className="mt-4 p-4 bg-yellow-100 bg-opacity-20 rounded-lg border border-yellow-300">
            <p className="text-yellow-200 text-center text-lg">
              <span className="font-semibold">Hint:</span> {currentPuzzle.hint}
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="text-center mt-6">
          <p className="text-blue-200">
            Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
