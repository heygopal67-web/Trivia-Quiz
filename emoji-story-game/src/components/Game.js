import React, { useState, useEffect, useCallback, useRef } from "react";
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

// Fisher–Yates shuffle to randomize puzzle order per session
const shuffleIndices = (length) => {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null); // 'emoji-story', 'word-scramble', 'math-puzzle', 'memory-game'
  const [gamePhase, setGamePhase] = useState("menu"); // 'menu', 'start', 'playing', 'gameOver'
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [currentEmojis, setCurrentEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  // hint is always shown; remove previous hint state entirely
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const bgmAudioRef = useRef(null);
  const [puzzleOrder, setPuzzleOrder] = useState(() =>
    shuffleIndices(puzzles.length)
  );

  // Helper to get the current puzzle data using the shuffled order
  const filteredPuzzles =
    selectedCategory === "All"
      ? puzzles
      : puzzles.filter((p) => (p.category || "Misc") === selectedCategory);
  const getCurrentPuzzleData = useCallback(() => {
    const orderedIndex = puzzleOrder[currentPuzzleIndex] ?? 0;
    const source = filteredPuzzles.length > 0 ? filteredPuzzles : puzzles;
    return source[orderedIndex % source.length];
  }, [currentPuzzleIndex, puzzleOrder, filteredPuzzles]);

  const loadPuzzle = useCallback(async () => {
    const total =
      filteredPuzzles.length > 0 ? filteredPuzzles.length : puzzles.length;
    if (currentPuzzleIndex >= total) {
      setGamePhase("gameOver");
      return;
    }

    setIsLoading(true);
    setFeedback("");
    setTimeLeft(15);

    try {
      const currentData = getCurrentPuzzleData();
      const emojis = await fetchEmojisForKeywords(currentData.keywords);
      setCurrentEmojis(emojis);
      setCurrentPuzzle(currentData);
    } catch (error) {
      console.error("Error loading puzzle:", error);
      const currentData = getCurrentPuzzleData();
      const fallbackEmojis = currentData.keywords.map((keyword) => {
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
      setCurrentPuzzle(currentData);
    } finally {
      setIsLoading(false);
    }
  }, [currentPuzzleIndex, puzzleOrder, selectedCategory, filteredPuzzles.length, getCurrentPuzzleData]);

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

  useEffect(() => {
    if (!bgmAudioRef.current) {
      const audio = new Audio("/bgm.mp3");
      audio.loop = true;
      audio.volume = 0.4;
      audio.muted = isMuted;
      bgmAudioRef.current = audio;
    } else {
      bgmAudioRef.current.muted = isMuted;
    }

    return () => {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
    };
  }, [isMuted]);

  const playBgm = () => {
    const audio = bgmAudioRef.current;
    if (!audio) return;
    if (!isMuted) {
      audio.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const audio = bgmAudioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) {
          audio.play().catch(() => {});
        }
      }
      return next;
    });
  };

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
    if (gameId === "emoji-story") {
      const total =
        filteredPuzzles.length > 0 ? filteredPuzzles.length : puzzles.length;
      setPuzzleOrder(shuffleIndices(total));
      setGamePhase("start");
    } else {
      setGamePhase("playing");
    }
    playBgm();
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
    setGamePhase("menu");
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setFeedback("");
    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause();
    }
  };

  const handleStartGame = () => {
    setGamePhase("playing");
    const total =
      filteredPuzzles.length > 0 ? filteredPuzzles.length : puzzles.length;
    setPuzzleOrder(shuffleIndices(total));
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setFeedback("");
    playBgm();
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
    } else {
      setFeedback("incorrect");
    }
  };

  const handleNext = () => {
    setCurrentPuzzleIndex((prev) => prev + 1);
  };

  // remove unused hint handler entirely

  const handlePlayAgain = () => {
    setGamePhase("start");
    const total =
      filteredPuzzles.length > 0 ? filteredPuzzles.length : puzzles.length;
    setPuzzleOrder(shuffleIndices(total));
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setFeedback("");
  };

  // If category changes while on start screen, reset order and index for a clean start
  useEffect(() => {
    if (currentGame === "emoji-story" && gamePhase === "start") {
      const total =
        filteredPuzzles.length > 0 ? filteredPuzzles.length : puzzles.length;
      setPuzzleOrder(shuffleIndices(total));
      setCurrentPuzzleIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

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
        isMuted={isMuted}
        onToggleMute={toggleMute}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={[
          "All",
          ...Array.from(new Set(puzzles.map((p) => p.category || "Misc"))),
        ]}
      />
    );
  }

  if (gamePhase === "gameOver") {
    return (
      <GameOver
        score={score}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
    );
  }

  // Keep rendering the game UI while loading next puzzle to avoid jarring transitions

  // Render Emoji Story Game
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg.gif)" }}
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 backdrop-blur transition-colors text-sm border border-slate-200 shadow"
        aria-label={
          isMuted ? "Unmute background music" : "Mute background music"
        }
        title={isMuted ? "Unmute" : "Mute"}
      >
        <span aria-hidden>{isMuted ? "🔇" : "🔊"}</span>
      </button>
      <div className="absolute inset-0 -z-10 bg-black/30" />
      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl ring-1 ring-white/60">
          {/* Header */}
          <div className="px-4 md:px-6 py-4 border-b border-white/40">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToMenu}
                  className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm border border-emerald-100"
                >
                  ← Menu
                </button>
                <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                  Guess the Movie: Emoji Quiz
                </h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <Timer timeLeft={timeLeft} />
                </div>
                <div className="text-slate-800 text-xs md:text-sm px-2 py-1 rounded-full bg-white/60 backdrop-blur ring-1 ring-white/50">
                  <span className="font-medium">{currentPuzzleIndex + 1}</span>{" "}
                  /{" "}
                  {filteredPuzzles.length > 0
                    ? filteredPuzzles.length
                    : puzzles.length}
                </div>
                <div className="text-emerald-900 text-xs md:text-sm px-2 py-1 rounded-full bg-emerald-50/80 backdrop-blur ring-1 ring-emerald-200/70">
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
            <EmojiDisplay emojis={currentEmojis} feedback={feedback} minimal />

            {/* Answer Input */}
            <AnswerInput
              onSubmit={handleAnswerSubmit}
              feedback={feedback}
              currentPuzzle={currentPuzzle}
            />

            {/* Hint Display */}
            {currentPuzzle && (
              <div className="mb-2 p-4 bg-white/50 backdrop-blur rounded-xl ring-1 ring-white/50 shadow">
                <div className="flex items-center justify-between">
                  <p className="text-slate-700 text-sm">
                    <span className="font-medium">Hint:</span>{" "}
                    {currentPuzzle.hint}
                  </p>
                  <span className="text-amber-500" aria-hidden>
                    💡
                  </span>
                </div>
              </div>
            )}

            {/* Next Button - only after answering */}
            {feedback !== "" && (
              <div className="text-center mt-4">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg font-medium text-sm md:text-base transition-colors duration-200 border shadow-sm bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
