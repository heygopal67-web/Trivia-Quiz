import React, { useState, useEffect, useMemo } from "react";

const AnswerInput = ({ onSubmit, feedback, currentPuzzle }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear selection when feedback changes (new puzzle loaded)
  useEffect(() => {
    if (feedback === "") {
      setSelectedAnswer("");
      setIsSubmitting(false);
    }
  }, [feedback]);

  const handleAnswerSelect = (answer) => {
    if (isSubmitting || feedback !== "") return;
    setSelectedAnswer(answer);
    setIsSubmitting(true);
    onSubmit(answer);
  };

  // No explicit submit; selection triggers submit

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
    <div className="mb-4">
      <div className="max-w-3xl mx-auto">
        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isSubmitting || feedback !== ""}
              className={`
                p-3 md:p-4 rounded-xl font-medium text-sm md:text-base transition-all duration-200
                border text-left shadow-sm
                ${
                  selectedAnswer === option && feedback === ""
                    ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]"
                    : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                }
                ${
                  isSubmitting || feedback !== ""
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
                ${
                  feedback === "correct" && selectedAnswer === option
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : feedback === "incorrect" && selectedAnswer === option
                    ? "bg-white text-red-700 border-2 border-red-600"
                    : ""
                }
                ${
                  feedback === "incorrect" &&
                  currentPuzzle &&
                  option === currentPuzzle.answer
                    ? "bg-emerald-50 text-emerald-700 border-emerald-600"
                    : ""
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback === "incorrect" && currentPuzzle && (
          <div className="text-center -mt-2 mb-3">
            <span className="text-emerald-700 text-xs md:text-sm font-medium">
              Correct answer: {currentPuzzle.answer}
            </span>
          </div>
        )}
        {/* Instructions removed per request */}
      </div>
    </div>
  );
};

export default AnswerInput;
