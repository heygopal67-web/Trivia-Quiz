import React from 'react';

const Timer = ({ timeLeft }) => {
  const progress = (timeLeft / 15) * 100;
  
  const getBarColor = () => {
    if (timeLeft > 10) return 'bg-emerald-400';
    if (timeLeft > 5) return 'bg-amber-400';
    return 'bg-red-400';
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">Time</span>
        <span className={`text-2xl font-light ${
          timeLeft > 10 ? 'text-emerald-400' : 
          timeLeft > 5 ? 'text-amber-400' : 'text-red-400'
        }`}>
          {timeLeft}s
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-out ${getBarColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Time warning */}
      {timeLeft <= 5 && (
        <div className="text-center mt-2">
          <span className="text-red-400 text-xs font-medium">
            Time running out
          </span>
        </div>
      )}
    </div>
  );
};

export default Timer;
