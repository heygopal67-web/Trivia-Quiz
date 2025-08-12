import React from "react";

const GameSelector = ({ onSelectGame }) => {
  const games = [
    {
      id: "emoji-story",
      title: "Guess the Emoji Story",
      description:
        "Decode emoji sequences to reveal movies, people, and events",
      icon: "🎭",
      image: "/guessmovie.png",
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

        {/* Icons Grid Only - app tile style */}
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
                className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg ring-1 ring-black/5 bg-gradient-to-br ${game.color} relative overflow-hidden transition-transform duration-150 group-hover:scale-[1.03]`}
              >
                {/* subtle inner shine */}
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
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
