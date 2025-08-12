import React from 'react';

const EmojiDisplay = ({ emojis, feedback }) => {
  const getFeedbackClass = () => {
    switch (feedback) {
      case 'correct':
        return 'animate-pulse bg-green-500 bg-opacity-20 border-green-400';
      case 'incorrect':
        return 'animate-pulse bg-red-500 bg-opacity-20 border-red-400';
      default:
        return 'bg-white bg-opacity-10 border-white border-opacity-30';
    }
  };

  return (
    <div className="mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4">
          What does this emoji sequence represent?
        </h2>
        
        {/* Emoji Container */}
        <div className={`
          inline-block p-8 rounded-2xl border-4 transition-all duration-300
          ${getFeedbackClass()}
        `}>
          <div className="flex items-center justify-center space-x-4 text-8xl">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="transform hover:scale-110 transition-transform duration-200"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
        
        {/* Feedback Message */}
        {feedback && (
          <div className={`mt-4 text-xl font-bold ${
            feedback === 'correct' ? 'text-green-400' : 'text-red-400'
          }`}>
            {feedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
