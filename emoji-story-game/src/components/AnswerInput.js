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
    <div className="mb-6">
      <div className="max-w-3xl mx-auto">
        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isSubmitting}
              className={`
                p-4 md:p-6 rounded-xl font-medium text-base md:text-lg transition-all duration-200
                border text-left shadow-sm
                ${
                  selectedAnswer === option
                    ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]"
                    : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                }
                ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
                ${
                  feedback === "correct" && selectedAnswer === option
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : feedback === "incorrect" && selectedAnswer === option
                    ? "bg-red-600 text-white border-red-600"
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
            className={`px-8 py-3 rounded-lg font-medium text-base md:text-lg transition-colors duration-200 border shadow-sm
              ${
                !selectedAnswer || isSubmitting
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
              }
            `}
          >
            {isSubmitting ? "Checking..." : "Submit Answer"}
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4">
          <p className="text-slate-500 text-sm">
            Click on an answer and then submit
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
