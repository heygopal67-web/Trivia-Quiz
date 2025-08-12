import React, { useState, useEffect, useCallback } from "react";
import { puzzles } from "../data";
import { fetchEmojisForKeywords } from "../api";
import StartScreen from "./StartScreen";
import Timer from "./Timer";
import EmojiDisplay from "./EmojiDisplay";
import AnswerInput from "./AnswerInput";
import GameOver from "./GameOver";

const Game = () => {
  const [gamePhase, setGamePhase] = useState("start");
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [currentEmojis, setCurrentEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const currentPuzzleData = puzzles[currentPuzzleIndex];

  const loadPuzzle = useCallback(async () => {
    if (currentPuzzleIndex >= puzzles.length) {
      setGamePhase("gameOver");
      return;
    }

    setIsLoading(true);
    setShowHint(false);
    setFeedback("");
    setTimeLeft(15);

    try {
      const emojis = await fetchEmojisForKeywords(currentPuzzleData.keywords);
      setCurrentEmojis(emojis);
      setCurrentPuzzle(currentPuzzleData);
    } catch (error) {
      console.error("Error loading puzzle:", error);
      const fallbackEmojis = currentPuzzleData.keywords.map((keyword) => {
        const fallbackMap = {
          wizard: "🧙‍♂️",
          ring: "💍",
          volcano: "🌋",
          spider: "🕷️",
          man: "👨",
          web: "🕸️",
          star: "⭐",
          wars: "⚔️",
          lightsaber: "⚡",
          bat: "🦇",
          gotham: "🏙️",
          iron: "🦾",
          arc: "🏹",
          harry: "👓",
          potter: "🏺",
          wand: "🪄",
          jedi: "⚔️",
          knight: "🤺",
          force: "💫",
          super: "🦸",
          krypton: "🪐",
          captain: "👨‍✈️",
          america: "🇺🇸",
          shield: "🛡️",
          thor: "⚡",
          hammer: "🔨",
          asgard: "🏰",
        };
        return fallbackMap[keyword.toLowerCase()] || "❓";
      });
      setCurrentEmojis(fallbackEmojis);
      setCurrentPuzzle(currentPuzzleData);
    } finally {
      setIsLoading(false);
    }
  }, [currentPuzzleIndex, currentPuzzleData]);

  useEffect(() => {
    if (gamePhase === "playing") {
      loadPuzzle();
    }
  }, [gamePhase, loadPuzzle]);

  useEffect(() => {
    if (gamePhase !== "playing" || isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, isLoading]);

  const handleStartGame = () => {
    setGamePhase("playing");
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setShowHint(false);
    setFeedback("");
  };

  const handleTimeUp = () => {
    setCurrentPuzzleIndex((prev) => prev + 1);
  };

  const handleAnswerSubmit = (answer) => {
    if (!currentPuzzle) return;

    const isCorrect =
      answer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase().trim();

    if (isCorrect) {
      const timeBonus = timeLeft;
      const roundScore = 10 + timeBonus;
      setScore((prev) => prev + roundScore);
      setFeedback("correct");

      setTimeout(() => {
        setCurrentPuzzleIndex((prev) => prev + 1);
      }, 1000);
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(""), 1000);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setScore((prev) => Math.max(0, prev - 5));
      setShowHint(true);
    }
  };

  const handlePlayAgain = () => {
    setGamePhase("start");
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setShowHint(false);
    setFeedback("");
  };

  if (gamePhase === "start") {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  if (gamePhase === "gameOver") {
    return <GameOver score={score} onPlayAgain={handlePlayAgain} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-white mb-2">
            Guess the Emoji Story
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-wider">
            Score: {score}
          </p>
        </div>

        {/* Timer */}
        <Timer timeLeft={timeLeft} />

        {/* Emoji Display */}
        <EmojiDisplay emojis={currentEmojis} feedback={feedback} />

        {/* Answer Input */}
        <AnswerInput onSubmit={handleAnswerSubmit} feedback={feedback} />

        {/* Hint Section */}
        <div className="text-center mb-8">
          <button
            onClick={handleHint}
            disabled={showHint}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${
                showHint
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-amber-500/20 text-amber-400 border border-amber-400/30 hover:bg-amber-500/30"
              }
            `}
          >
            {showHint ? "Hint Used" : "Get Hint (-5 points)"}
          </button>
        </div>

        {/* Hint Display */}
        {showHint && currentPuzzle && (
          <div className="mb-8 p-4 bg-amber-500/10 rounded-xl border border-amber-400/20">
            <p className="text-amber-300 text-center text-sm">
              <span className="font-medium">Hint:</span> {currentPuzzle.hint}
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="text-center">
          <p className="text-slate-500 text-xs uppercase tracking-wider">
            Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
