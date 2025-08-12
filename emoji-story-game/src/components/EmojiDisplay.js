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
    <div className="mb-8">
      <div className="text-center">
        <h2 className="text-slate-600 text-base font-medium mb-6 tracking-wide">
          What does this represent?
        </h2>

        {/* Emoji Container - Larger and more prominent */}
        <div
          className={`inline-block p-10 md:p-12 rounded-2xl border transition-all duration-300 ${getFeedbackClass()}`}
        >
          <div className="flex items-center justify-center gap-6 md:gap-10 text-6xl md:text-8xl">
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
        {feedback && (
          <div
            className={`mt-4 text-base font-medium ${
              feedback === "correct" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {feedback === "correct" ? "Correct!" : "Try again"}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
