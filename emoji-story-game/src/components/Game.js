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
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  const bgmAudioRef = useRef(null);
  const MAX_ROUNDS = 10;
  const [puzzleOrder, setPuzzleOrder] = useState([]);

  // Get filtered puzzles based on selected category
  const filteredPuzzles = useCallback(() => {
    if (selectedCategory === "All") {
      return puzzles;
    }
    return puzzles.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get current puzzle data
  const getCurrentPuzzleData = useCallback(() => {
    const puzzleList = filteredPuzzles();
    if (puzzleList.length === 0) return null;

    const orderedIndex = puzzleOrder[currentPuzzleIndex];
    if (orderedIndex === undefined || orderedIndex >= puzzleList.length)
      return null;

    return puzzleList[orderedIndex];
  }, [currentPuzzleIndex, puzzleOrder, filteredPuzzles]);

  // Initialize puzzle order when category changes
  useEffect(() => {
    const puzzleList = filteredPuzzles();
    const totalRounds = Math.min(MAX_ROUNDS, puzzleList.length);
    const newOrder = shuffleIndices(puzzleList.length).slice(0, totalRounds);
    setPuzzleOrder(newOrder);
    setCurrentPuzzleIndex(0);
  }, [selectedCategory, filteredPuzzles]);

  const loadPuzzle = useCallback(async () => {
    const puzzleList = filteredPuzzles();
    const totalRounds = Math.min(MAX_ROUNDS, puzzleList.length);

    if (currentPuzzleIndex >= totalRounds) {
      setGamePhase("gameOver");
      return;
    }

    setIsLoading(true);
    setFeedback("");
    setTimeLeft(15);

    try {
      const currentData = getCurrentPuzzleData();
      if (!currentData) {
        console.error("No puzzle data available");
        return;
      }

      const emojis = await fetchEmojisForKeywords(currentData.keywords);
      setCurrentEmojis(emojis);
      setCurrentPuzzle(currentData);
    } catch (error) {
      console.error("Error loading puzzle:", error);
      const currentData = getCurrentPuzzleData();
      if (!currentData) return;

      const fallbackEmojis = currentData.keywords.map((keyword) => {
        const fallbackMap = {
          // Original keywords
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

          // Sci-Fi keywords
          matrix: "💊",
          hacker: "💻",
          simulation: "🔄",
          avatar: "🔵",
          pandora: "🌿",
          blue: "🔷",
          interstellar: "🌌",
          space: "🚀",
          wormhole: "🌀",
          alien: "👽",
          bike: "🚲",
          moon: "🌙",
          replicant: "🤖",
          rain: "🌧️",
          neon: "💡",
          xenomorph: "👾",
          ship: "🚢",
          desert: "🏜️",
          spice: "🧂",
          worms: "🪱",
          time: "⏰",
          travel: "✈️",
          car: "🚗",
          robot: "🤖",
          cyborg: "🔧",
          future: "🔮",

          // Fantasy keywords
          hobbit: "🧝",
          dragon: "🐉",
          journey: "🗺️",
          wardrobe: "🚪",
          winter: "❄️",
          true: "✅",
          swashbuckler: "⚔️",
          faun: "🐐",
          maze: "🌀",
          war: "⚔️",
          sleep: "😴",
          horns: "🦄",
          creatures: "🐾",
          suitcase: "💼",
          rose: "🌹",
          castle: "🏰",
          fallen: "🍂",
          sky: "☁️",

          // Adventure keywords
          dinosaur: "🦕",
          island: "🏝️",
          park: "🎡",
          pirate: "🏴‍☠️",
          curse: "⚡",
          archaeologist: "🔍",
          whip: "🪢",
          temple: "🏛️",
          game: "🎲",
          jungle: "🌴",
          dice: "🎲",
          tomb: "⚰️",
          scarab: "🪲",
          map: "🗺️",
          liberty: "🗽",
          heist: "🦹",
          boy: "👦",
          wolves: "🐺",
          bear: "🐻",
          gorilla: "🦍",
          skyscraper: "🏢",
          tiger: "🐯",
          boat: "⛵",
          ocean: "🌊",
          treasure: "💎",
          kids: "👶",

          // Animation keywords
          frozen: "❄️",
          ice: "🧊",
          queen: "👑",
          aladdin: "🧞",
          genie: "🪔",
          lamp: "💡",
          lion: "🦁",
          king: "👑",
          savanna: "🌾",
          wakanda: "💎",
          panther: "🐆",
          guardians: "🛡️",
          galaxy: "🌌",
          mixtape: "📼",
          amazon: "🏹",
          warrior: "⚔️",
          lasso: "🪢",
          deadpool: "🔴",
          mercenary: "💰",
          red: "🔴",
          toys: "🧸",
          friendship: "🤝",
          cowboy: "🤠",
          fish: "🐠",
          clown: "🤡",
          ogre: "👹",
          swamp: "🐸",
          donkey: "🦙",
          emotions: "😊",
          mind: "🧠",
          joy: "😄",
          guitar: "🎸",
          skeleton: "💀",
          marigold: "🌼",
          balloons: "🎈",
          house: "🏠",
          old: "👴",
          rat: "🐀",
          chef: "👨‍🍳",
          paris: "🗼",

          // Action keywords
          mission: "🎯",
          spy: "🕵️",
          mask: "🎭",
          agent: "🕵️",
          "007": "🔫",
          martini: "🍸",
          tower: "🗼",
          christmas: "🎄",
          cop: "👮",
          chase: "🏃",
          rig: "🚛",
          hitman: "💀",
          dog: "🐕",
          revenge: "⚔️",
          amnesia: "🧠",
          passport: "📄",
          bus: "🚌",
          bomb: "💣",
          fast: "⚡",
          rome: "🏛️",
          arena: "⚔️",
          spartans: "🛡️",
          battle: "⚔️",
          persia: "🏺",
          boxer: "🥊",
          underdog: "🐕",
          training: "💪",

          // Thriller keywords
          inception: "🌙",
          dream: "💭",
          sins: "😈",
          serial: "📺",
          fbi: "🕵️",
          cannibal: "🍖",
          lotion: "🧴",
          asylum: "🏥",
          storm: "⛈️",
          marshal: "👮",
          kidnapping: "🚨",
          rivalry: "⚔️",
          trick: "🎭",
          rules: "📜",
          underground: "🚇",
          class: "📚",
          scheme: "🎭",
          camera: "📷",
          news: "📰",
          accident: "🚑",
          disappearance: "❓",
          marriage: "💒",
          media: "📺",
          soap: "🧼",
          house: "🏠",
          book: "📚",
          monster: "👹",
          grief: "😢",
          sunken: "🌊",
          tea: "☕",
          chair: "🪑",
          haunted: "👻",
          demons: "😈",
          detective: "🕵️",
          london: "🇬🇧",
          violin: "🎻",

          // Comedy keywords
          thieves: "🦹",
          traps: "🪤",
          mask: "🎭",
          trickster: "🎭",
          green: "🟢",
          vegas: "🎰",
          tiger: "🐯",
          missing: "❓",
          teen: "👨‍🎓",
          party: "🎉",
          id: "🆔",
          friends: "👥",
          road: "🛣️",
          van: "🚐",
          nanny: "👩‍👶",
          disguise: "🎭",
          family: "👨‍👩‍👧‍👦",
          loop: "🔄",
          alarm: "⏰",
          weather: "🌤️",
          highschool: "🏫",
          burn: "🔥",
          book: "📚",
          drum: "🥁",
          bunk: "🛏️",
          boats: "⛵",
          zombie: "🧟",
          pub: "🍺",
          cricket: "🦗",

          // Romance keywords
          ship: "🚢",
          iceberg: "🧊",
          love: "❤️",
          jazz: "🎷",
          dance: "💃",
          hollywood: "🎬",
          letters: "💌",
          rain: "🌧️",
          lake: "🏞️",
          regency: "👑",
          proposal: "💍",
          singapore: "🇸🇬",
          wealth: "💰",
          bookshop: "📚",
          actress: "🎭",
          illness: "🤒",
          promise: "🤝",
          poem: "📝",
          bet: "💰",
          memory: "🧠",
          erase: "",
          beach: "🏖️",
          cancer: "🦀",
          amsterdam: "🇳🇱",
          stars: "⭐",

          // Horror keywords
          clown: "🤡",
          balloon: "🎈",
          sewer: "🚽",
          nightmare: "😱",
          glove: "🧤",
          freddy: "🔪",
          tape: "📼",
          well: "🕳️",
          seven: "7️⃣",
          possession: "👹",
          priest: "⛪",
          pea: "🫛",
          cult: "👥",
          miniatures: "🏠",
          click: "🖱️",
          grief: "😢",
          sunken: "🌊",
          tea: "☕",
          chair: "🪑",
          hotel: "🏨",
          twins: "👯",
          axe: "🪓",
          silence: "🤫",
          monsters: "👹",

          // Mystery keywords
          knife: "🔪",
          mansion: "🏰",
          hacker: "💻",
          journalist: "📰",
          case: "📁",
          train: "🚂",
          mustache: "👨",
          code: "🔐",
          killer: "🔪",
          symbols: "🔯",
          louvre: "🏛️",
          church: "⛪",
          kidnap: "🚨",
          boston: "🇺🇸",
          revenge: "⚔️",
          imprisoned: "🔒",
          octopus: "🐙",
          neighbor: "🏠",
          apartment: "🏢",

          // Classics keywords
          mafia: "🕴️",
          don: "👔",
          life: "💚",
          chocolates: "🍫",
          bench: "🪑",
          letters: "💌",
          airport: "✈️",
          piano: "🎹",
          rosebud: "🌹",
          newspaper: "📰",
          tycoon: "💰",
          yellow: "🟡",
          road: "🛣️",
          witch: "🧙‍♀️",
          umbrella: "☂️",
          tap: "🚰",
          studio: "🎬",
          shower: "🚿",
          motel: "🏨",
          mother: "👩",
          angel: "👼",
          bells: "🔔",
          town: "🏘️",
          nuns: "👩‍💼",
          alps: "🏔️",
          songs: "🎵",
          rebellion: "⚔️",
          chief: "👨‍💼",

          // Sports keywords
          football: "🏈",
          coach: "📋",
          unity: "🤝",
          basketball: "🏀",
          grades: "📊",
          baseball: "⚾",
          stats: "📈",
          oakland: "🌉",
          crane: "🦩",
          dojo: "🏯",
          wax: "🕯️",
          corn: "🌽",
          ghosts: "👻",
          build: "🏗️",
          notre: "⛪",
          dream: "💭",
          tunes: "🎵",
          legacy: "👑",
          adonis: "💪",
          family: "👨‍👩‍👧‍👦",
          left: "⬅️",
          olympics: "🏅",
          running: "🏃",
          chariot: "🏺",
        };
        return fallbackMap[keyword.toLowerCase()] || "❓";
      });
      setCurrentEmojis(fallbackEmojis);
      setCurrentPuzzle(currentData);
    } finally {
      setIsLoading(false);
    }
  }, [currentPuzzleIndex, filteredPuzzles, getCurrentPuzzleData]);

  useEffect(() => {
    if (gamePhase === "playing" && currentGame === "emoji-story") {
      loadPuzzle();
    }
  }, [gamePhase, currentGame, loadPuzzle]);

  useEffect(() => {
    if (
      gamePhase !== "playing" ||
      isLoading ||
      currentGame !== "emoji-story" ||
      isTimerPaused
    )
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
  }, [gamePhase, isLoading, currentGame, isTimerPaused]);

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
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setFeedback("");
    setIsTimerPaused(false); // Reset timer pause state
    playBgm();
  };

  const handleTimeUp = () => {
    if (feedback === "") {
      // Only auto-advance if no answer was given
      setFeedback("timeout");
      setIsTimerPaused(true);
    }
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
      setIsTimerPaused(true); // Pause timer when answer is submitted
    } else {
      setFeedback("incorrect");
      setIsTimerPaused(true); // Pause timer when answer is submitted
    }
  };

  const handleNext = () => {
    setCurrentPuzzleIndex((prev) => prev + 1);
    setTimeLeft(15); // Reset timer for next question
    setIsTimerPaused(false); // Resume timer for next question
    setFeedback(""); // Clear feedback
  };

  // remove unused hint handler entirely

  const handlePlayAgain = () => {
    setGamePhase("start");
    setCurrentPuzzleIndex(0);
    setScore(0);
    setTimeLeft(15);
    setFeedback("");
    setIsTimerPaused(false); // Reset timer pause state
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
        isMuted={isMuted}
        onToggleMute={toggleMute}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={[
          "All",
          ...Array.from(new Set(puzzles.map((p) => p.category))),
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
  const puzzleList = filteredPuzzles();
  const totalRounds = Math.min(MAX_ROUNDS, puzzleList.length);

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
                  / {totalRounds}
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

            {/* Timeout Message */}
            {feedback === "timeout" && (
              <div className="mb-2 p-4 bg-red-50 backdrop-blur rounded-xl ring-1 ring-red-200 shadow">
                <div className="flex items-center justify-between">
                  <p className="text-red-700 text-sm">
                    <span className="font-medium">Time's up!</span> The correct
                    answer was: {currentPuzzle?.answer}
                  </p>
                  <span className="text-red-500" aria-hidden>
                    ⏰
                  </span>
                </div>
              </div>
            )}

            {/* Next Button - only after answering or timeout */}
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
