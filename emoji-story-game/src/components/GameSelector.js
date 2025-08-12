import React, { useEffect, useRef, useState } from "react";

const GameSelector = ({ onSelectGame }) => {
  const games = [
    {
      id: "emoji-story",
      title: "Guess the Movie",
      description:
        "Decode emoji sequences to reveal movies, people, and events",
      icon: "🎭",
      image: "/movie.png",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Unscramble letters to form meaningful words",
      icon: "🔤",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "math-puzzle",
      title: "Math Puzzle",
      description: "Solve mathematical equations against the clock",
      icon: "🧮",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: "memory-game",
      title: "Memory Game",
      description: "Test your memory by matching hidden cards",
      icon: "🧠",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = true; // start muted until interaction
    audioRef.current = audio;
    return () => {
      try {
        audio.pause();
      } catch (_) {}
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isSoundOn) {
      audio.muted = false;
      audio
        .play()
        .then(() => setHasStarted(true))
        .catch(() => {});
    } else {
      // keep audio ready; mute instead of stopping for instant unmute
      audio.muted = true;
      if (!hasStarted) {
        audio
          .play()
          .then(() => audio.pause())
          .catch(() => {});
      }
    }
  }, [isSoundOn, hasStarted]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${isNight ? "/night.gif" : "/tree.gif"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isNight ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.4)",
        }}
      />
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 bg-emerald-300/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-72 h-72 bg-teal-300/20 blur-3xl rounded-full" />

      {/* Night/Day and Sound toggles */}
      <button
        onClick={() => setIsNight((v) => !v)}
        aria-label={
          isNight ? "Switch to day background" : "Switch to night background"
        }
        className="absolute right-16 top-4 z-10 bg-black/50 text-white rounded-full p-2 backdrop-blur hover:bg-black/70 transition-colors"
      >
        <span className="text-xl" aria-hidden>
          {isNight ? "☀️" : "🌙"}
        </span>
      </button>
      <button
        onClick={() => setIsSoundOn((v) => !v)}
        aria-label={
          isSoundOn ? "Mute background sound" : "Play background sound"
        }
        className="absolute right-4 top-4 z-10 bg-black/50 text-white rounded-full p-2 backdrop-blur hover:bg-black/70 transition-colors"
      >
        <span className="text-xl" aria-hidden>
          {isSoundOn ? "🔊" : "🔇"}
        </span>
      </button>

      <div className="relative z-0 max-w-5xl mx-auto p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Pick a Game
          </h1>
          <p className="text-white/90 text-sm md:text-base mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Quick, fun mini‑games. Tap a tile to jump in.
          </p>
        </div>

        {/* Icons Grid with captions */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              aria-label={game.title}
              title={game.title}
              className="group focus:outline-none"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.28)] ring-1 ring-black/20  relative overflow-hidden transition-transform duration-150 group-hover:scale-[1.04]`}
              >
                {/* subtle inner shine */}
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-xl shadow-sm"
                    />
                  ) : (
                    <span className="text-4xl md:text-5xl" aria-hidden>
                      {game.icon}
                    </span>
                  )}
                </div>
              </div>
              <span className="mt-2 block text-center text-[11px] md:text-xs font-medium text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                {game.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GameSelector;
