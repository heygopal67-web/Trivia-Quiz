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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-4 tracking-tight">
            Game Center
          </h1>
          <p className="text-slate-300 text-lg font-light">
            Choose a game to play and challenge yourself
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`
                ${game.bgColor} ${game.borderColor} border rounded-2xl p-8 cursor-pointer
                transition-all duration-300 hover:scale-105 hover:shadow-2xl
                backdrop-blur-sm hover:backdrop-blur-md
              `}
            >
              <div className="text-center">
                {/* Game Icon */}
                <div className={`text-6xl mb-4 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                  {game.icon}
                </div>
                
                {/* Game Title */}
                <h2 className="text-2xl font-medium text-white mb-3">
                  {game.title}
                </h2>
                
                {/* Game Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {game.description}
                </p>
                
                {/* Play Button */}
                <div className={`inline-block px-6 py-3 bg-gradient-to-r ${game.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200`}>
                  Play Now
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            More games coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
