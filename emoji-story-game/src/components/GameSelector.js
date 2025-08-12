import React from "react";

const GameSelector = ({ onSelectGame }) => {
  const games = [
    {
      id: "emoji-story",
      title: "Guess the Emoji Story",
      description:
        "Decode emoji sequences to reveal movies, people, and events",
      icon: "🎭",
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2 tracking-tight">
            Game Center
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Tap an icon to start
          </p>
        </div>

        {/* Icons Grid Only */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 justify-items-center">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              aria-label={game.title}
              title={game.title}
              className="text-5xl md:text-6xl p-2 md:p-3 rounded-xl hover:bg-slate-100 transition-colors duration-150"
            >
              <span aria-hidden>{game.icon}</span>
              <span className="sr-only">{game.title}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-sm">More games coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
