import React from "react";

const EmojiDisplay = ({ emojis, feedback }) => {
  const getFeedbackClass = () => {
    switch (feedback) {
      case "correct":
        return "bg-emerald-50 border-emerald-200";
      case "incorrect":
        return "bg-red-50 border-red-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="mb-6">
      <div className="text-center">
        <h2 className="text-slate-600 text-sm font-medium mb-4 tracking-wide">
          What does this represent?
        </h2>

        {/* Emoji Container - Larger and more prominent */}
        <div
          className={`inline-block p-4 md:p-6 rounded-2xl border transition-all duration-300 ${getFeedbackClass()}`}
        >
          <div className="flex items-center justify-center gap-5 md:gap-8 text-5xl md:text-7xl">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="transition-transform duration-200 hover:scale-110"
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Message */}
        {feedback === "correct" && (
          <div className="mt-3 text-sm md:text-base font-medium text-emerald-600">
            Correct!
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
