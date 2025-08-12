import React from 'react';

const Timer = ({ timeLeft }) => {
  const progress = (timeLeft / 15) * 100; // 15 seconds total
  
  // Color based on time remaining
  const getBarColor = () => {
    if (timeLeft > 10) return 'bg-green-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-semibold">Time Remaining</span>
        <span className={`text-2xl font-bold ${
          timeLeft > 10 ? 'text-green-400' : 
          timeLeft > 5 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {timeLeft}s
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${getBarColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Time warning animation */}
      {timeLeft <= 5 && (
        <div className="text-center mt-2">
          <span className="text-red-400 font-bold animate-pulse">
            ⚠️ Time is running out!
          </span>
        </div>
      )}
    </div>
  );
};

export default Timer;
