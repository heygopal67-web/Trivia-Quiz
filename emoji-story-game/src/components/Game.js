import React, { useState, useEffect, useCallback } from "react";
import { puzzles } from "../data";
import { fetchEmojisForKeywords } from "../api";
import GameSelector from "./GameSelector";
import StartScreen from "./StartScreen";
import Timer from "./Timer";
import EmojiDisplay from "./EmojiDisplay";
import AnswerInput from "./AnswerInput";
import GameOver from "./GameOver";
import WordScramble from "./WordScramble";
import MathPuzzle from "./MathPuzzle";
import MemoryGame from "./MemoryGame";

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null); // 'emoji-story', 'word-scramble', 'math-puzzle', 'memory-game'
  const [gamePhase, setGamePhase] = useState("menu"); // 'menu', 'start', 'playing', 'gameOver'
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
    if (gamePhase === "playing" && currentGame === "emoji-story") {
      loadPuzzle();
    }
  }, [gamePhase, currentGame, loadPuzzle]);

  useEffect(() => {
    if (gamePhase !== "playing" || isLoading || currentGame !== "emoji-story")
      return;

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
  }, [gamePhase, isLoading, currentGame]);

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
    if (gameId === "emoji-story") {
      setGamePhase("start");
    } else {
      setGamePhase("playing");
    }
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
    setGamePhase("menu");
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setShowHint(false);
    setFeedback("");
  };

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

  // Render different phases and games
  if (gamePhase === "menu") {
    return <GameSelector onSelectGame={handleGameSelect} />;
  }

  if (currentGame === "word-scramble") {
    return <WordScramble onBackToMenu={handleBackToMenu} />;
  }

  if (currentGame === "math-puzzle") {
    return <MathPuzzle onBackToMenu={handleBackToMenu} />;
  }

  if (currentGame === "memory-game") {
    return <MemoryGame onBackToMenu={handleBackToMenu} />;
  }

  if (gamePhase === "start") {
    return (
      <StartScreen
        onStartGame={handleStartGame}
        onBackToMenu={handleBackToMenu}
      />
    );
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

  // Render Emoji Story Game
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToMenu}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                ← Back to Menu
              </button>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Guess the Movie: Emoji Quiz
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:block">
                <Timer timeLeft={timeLeft} />
              </div>
              <div className="text-slate-600 text-sm">
                <span className="font-medium">{currentPuzzleIndex + 1}</span> of{" "}
                {puzzles.length}
              </div>
              <div className="text-slate-600 text-sm">
                <span className="uppercase tracking-wide">Score:</span>{" "}
                <span className="font-semibold">{score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-6">
          {/* Timer (mobile) */}
          <div className="md:hidden mb-4">
            <Timer timeLeft={timeLeft} />
          </div>

          {/* Emoji Display */}
          <EmojiDisplay emojis={currentEmojis} feedback={feedback} />

          {/* Answer Input */}
          <AnswerInput
            onSubmit={handleAnswerSubmit}
            feedback={feedback}
            currentPuzzle={currentPuzzle}
          />

          {/* Hint Section */}
          <div className="text-center mb-6">
            <button
              onClick={handleHint}
              disabled={showHint}
              className={`
                px-5 py-3 rounded-lg font-medium transition-all duration-200 border
                ${
                  showHint
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                }
              `}
            >
              {showHint ? "Hint Used" : "Get Hint (-5 points)"}
            </button>
          </div>

          {/* Hint Display */}
          {showHint && currentPuzzle && (
            <div className="mb-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-700 text-sm flex items-start gap-2">
                <span className="text-amber-500">💡</span>
                <span>
                  <span className="font-medium">Hint:</span>{" "}
                  {currentPuzzle.hint}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
