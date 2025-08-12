import React, { useState, useEffect } from 'react';

const AnswerInput = ({ onSubmit, feedback }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear input when feedback changes (new puzzle loaded)
  useEffect(() => {
    if (feedback === '') {
      setAnswer('');
    }
  }, [feedback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(answer.trim());
      
      // Reset submitting state after a brief delay
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col space-y-4">
          <label htmlFor="answer" className="text-white text-lg font-semibold text-center">
            Your Answer:
          </label>
          
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            disabled={isSubmitting}
            className={`
              px-4 py-3 text-lg rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              ${isSubmitting 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-50 focus:bg-white'
              }
              ${feedback === 'correct' ? 'border-green-400' : 
                feedback === 'incorrect' ? 'border-red-400' : 'border-gray-300'
              }
            `}
          />
          
          <button
            type="submit"
            disabled={!answer.trim() || isSubmitting}
            className={`
              px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200
              ${!answer.trim() || isSubmitting
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transform'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        </div>
      </form>
      
      {/* Instructions */}
      <div className="text-center mt-4">
        <p className="text-blue-200 text-sm">
          Press Enter or click Submit to answer
        </p>
      </div>
    </div>
  );
};

export default AnswerInput;
