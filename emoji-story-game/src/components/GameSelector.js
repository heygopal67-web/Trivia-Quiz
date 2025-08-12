import React from 'react';

const GameSelector = ({ onSelectGame }) => {
  const games = [
    {
      id: 'emoji-story',
      title: 'Guess the Emoji Story',
      description: 'Decode emoji sequences to reveal movies, people, and events',
      icon: '🎭',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble letters to form meaningful words',
      icon: '🔤',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'math-puzzle',
      title: 'Math Puzzle',
      description: 'Solve mathematical equations against the clock',
      icon: '🧮',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'memory-game',
      title: 'Memory Game',
      description: 'Test your memory by matching hidden cards',
      icon: '🧠',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2 tracking-tight">
            Game Center
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Choose a game to play and challenge yourself
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`
                bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer
                transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
              `}
            >
              <div className="text-center">
                {/* Game Icon */}
                <div className={`text-5xl md:text-6xl mb-3 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                  {game.icon}
                </div>

                {/* Game Title */}
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  {game.title}
                </h2>

                {/* Game Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {game.description}
                </p>

                {/* Play Button */}
                <div className="inline-block px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800">
                  Play Now
                </div>
              </div>
            </div>
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
