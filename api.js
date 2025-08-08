// API Service for Trivia Questions
class TriviaAPI {
  constructor() {
    this.baseURL = "https://opentdb.com/api.php";
    this.categoryMap = {
      general: 9, // General Knowledge
      sports: 21, // Sports
      movies: 11, // Entertainment: Film
      science: 17, // Science & Nature
    };

    this.difficultyMap = {
      easy: "easy",
      medium: "medium",
      hard: "hard",
    };
  }

  // Fetch questions from Open Trivia Database
  async fetchQuestions(category, difficulty, amount = 10) {
    try {
      const categoryId = this.categoryMap[category];
      const difficultyLevel = this.difficultyMap[difficulty];

      const url = `${this.baseURL}?amount=${amount}&category=${categoryId}&difficulty=${difficultyLevel}&type=multiple`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error(`API error! response_code: ${data.response_code}`);
      }

      // Transform API data to match our app's format
      return this.transformQuestions(data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Fallback to local questions if API fails
      return this.getFallbackQuestions(category, difficulty);
    }
  }

  // Transform API questions to match our app's format
  transformQuestions(apiQuestions) {
    return apiQuestions.map((question) => {
      // Decode HTML entities
      const decodedQuestion = this.decodeHTML(question.question);
      const decodedCorrect = this.decodeHTML(question.correct_answer);
      const decodedIncorrect = question.incorrect_answers.map((answer) =>
        this.decodeHTML(answer)
      );

      // Combine correct and incorrect answers, then shuffle
      const allOptions = [decodedCorrect, ...decodedIncorrect];
      const shuffledOptions = this.shuffleArray(allOptions);

      // Find the index of the correct answer in shuffled options
      const correctIndex = shuffledOptions.indexOf(decodedCorrect);

      return {
        question: decodedQuestion,
        options: shuffledOptions,
        correct: correctIndex,
        explanation: `The correct answer is: ${decodedCorrect}`,
      };
    });
  }

  // Decode HTML entities
  decodeHTML(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  // Shuffle array using Fisher-Yates algorithm
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Fallback questions if API fails
  getFallbackQuestions(category, difficulty) {
    try {
      // Return a subset of our local questions as fallback
      const availableQuestions = quizData[category][difficulty];
      if (!availableQuestions || availableQuestions.length === 0) {
        throw new Error("No fallback questions available");
      }
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10);
    } catch (error) {
      console.error("Fallback questions failed:", error);
      // Return some basic questions as last resort
      return this.getBasicQuestions();
    }
  }

  // Basic questions as last resort
  getBasicQuestions() {
    return [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
        explanation: "Paris is the capital and largest city of France.",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        explanation:
          "Mars is called the Red Planet due to its reddish appearance.",
      },
      {
        question: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correct: 3,
        explanation:
          "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
    ];
  }

  // Get available categories
  getCategories() {
    return Object.keys(this.categoryMap);
  }

  // Get available difficulties
  getDifficulties() {
    return Object.keys(this.difficultyMap);
  }
}

// Create global API instance
const triviaAPI = new TriviaAPI();
