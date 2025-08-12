import React from 'react';

const EmojiDisplay = ({ emojis, feedback }) => {
  const getFeedbackClass = () => {
    switch (feedback) {
      case 'correct':
        return 'bg-emerald-500/20 border-emerald-400/30';
      case 'incorrect':
        return 'bg-red-500/20 border-red-400/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center">
        <h2 className="text-slate-300 text-lg font-light mb-8 uppercase tracking-wider">
          What does this represent?
        </h2>
        
        {/* Emoji Container - Larger and more prominent */}
        <div className={`
          inline-block p-16 rounded-3xl border-2 transition-all duration-300
          ${getFeedbackClass()}
        `}>
          <div className="flex items-center justify-center space-x-10 text-8xl">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="transform hover:scale-110 transition-transform duration-200"
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
        
        {/* Feedback Message */}
        {feedback && (
          <div className={`mt-6 text-lg font-medium ${
            feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {feedback === 'correct' ? 'Correct!' : 'Try again'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
