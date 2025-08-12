import React from "react";

const StartScreen = ({
  onStartGame,
  onBackToMenu,
  isMuted,
  onToggleMute,
  selectedCategory,
  onSelectCategory,
  categories = ["All"],
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg.gif)" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      <button
        onClick={onToggleMute}
        className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 backdrop-blur transition-colors text-sm border border-slate-200 shadow"
        aria-label={
          isMuted ? "Unmute background music" : "Mute background music"
        }
        title={isMuted ? "Unmute" : "Mute"}
      >
        <span aria-hidden>{isMuted ? "🔇" : "🔊"}</span>
      </button>

      <div className="max-w-3xl mx-auto text-center rounded-3xl bg-white/65 backdrop-blur-xl shadow-xl ring-1 ring-white/60 p-6 md:p-10 space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMenu}
            className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm border border-emerald-100"
          >
            ← Menu
          </button>
          <div />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Guess the Movie: Emoji Quiz
          </h1>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Decode emoji sequences to reveal movies, people, and events.
          </p>
        </div>

        {/* Example Puzzle */}
        <div className="bg-white/55 backdrop-blur rounded-2xl p-6 ring-1 ring-white/60 shadow">
          <p className="text-slate-600 text-xs uppercase tracking-wider mb-3">
            Example
          </p>
          <div className="flex items-center justify-center gap-5 text-4xl md:text-5xl mb-3">
            <span>🧙‍♂️</span>
            <span>💍</span>
            <span>🌋</span>
          </div>
          <p className="text-slate-900 text-base md:text-lg">
            Lord of the Rings
          </p>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-2 rounded-full text-sm transition-colors ring-1 backdrop-blur shadow-sm ${
                (selectedCategory || "All") === cat
                  ? "bg-emerald-600 text-white ring-emerald-500"
                  : "bg-white/60 text-slate-700 ring-white/50 hover:bg-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm">
          <div className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur ring-1 ring-white/50 text-slate-700">
            {" "}
            <span className="text-slate-900 font-medium">15s</span> per puzzle
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur ring-1 ring-white/50 text-slate-700">
            {" "}
            <span className="text-slate-900 font-medium">+10</span> points +
            time bonus
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur ring-1 ring-white/50 text-slate-700">
            {" "}
            <span className="text-slate-900 font-medium">Hints</span> always
            visible
          </div>
        </div>

        {/* Start Button */}
        <div>
          <button
            onClick={onStartGame}
            className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white text-base md:text-lg font-medium rounded-lg hover:bg-slate-800 transition-colors shadow"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
