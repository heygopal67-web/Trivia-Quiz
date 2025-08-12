import React, { useState, useEffect, useMemo } from "react";

const AnswerInput = ({ onSubmit, feedback, currentPuzzle }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear selection when feedback changes (new puzzle loaded)
  useEffect(() => {
    if (feedback === "") {
      setSelectedAnswer("");
    }
  }, [feedback]);

  const handleAnswerSelect = (answer) => {
    if (isSubmitting) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(selectedAnswer);

      // Reset submitting state after a brief delay
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  // Generate multiple choice options based on the current puzzle
  const generateOptions = () => {
    if (!currentPuzzle) return [];

    const correctAnswer = currentPuzzle.answer;
    const options = [correctAnswer];

    // Add some common wrong answers based on the puzzle type
    const wrongAnswers = [
      "The Matrix",
      "Blade Runner",
      "Honey, I Shrunk the Kids",
      "Jurassic Park",
      "Star Wars",
      "Batman",
      "Iron Man",
      "Harry Potter",
      "Superman",
      "Captain America",
    ];

    // Filter out the correct answer and add 3 random wrong answers
    const filteredWrongAnswers = wrongAnswers.filter(
      (answer) => answer !== correctAnswer
    );

    // Shuffle and take first 3
    const shuffled = filteredWrongAnswers.sort(() => 0.5 - Math.random());
    options.push(...shuffled.slice(0, 3));

    // Shuffle all options
    return options.sort(() => 0.5 - Math.random());
  };

  const options = useMemo(() => generateOptions(), [currentPuzzle?.answer]);

  return (
    <div className="mb-8">
      <div className="max-w-2xl mx-auto">
        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isSubmitting}
              className={`
                p-6 rounded-xl font-medium text-lg transition-all duration-200
                border-2 text-left
                ${
                  selectedAnswer === option
                    ? "bg-white text-slate-900 border-white shadow-lg scale-105"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
                }
                ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:scale-105"
                }
                ${
                  feedback === "correct" && selectedAnswer === option
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                    : feedback === "incorrect" && selectedAnswer === option
                    ? "bg-red-500/20 border-red-400 text-red-400"
                    : ""
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || isSubmitting}
            className={`
              px-12 py-4 rounded-xl font-medium text-lg transition-all duration-200
              ${
                !selectedAnswer || isSubmitting
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-900 hover:bg-slate-100 hover:scale-105"
              }
            `}
          >
            {isSubmitting ? "Checking..." : "Submit Answer"}
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4">
          <p className="text-slate-400 text-sm">
            Click on an answer and then submit
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
