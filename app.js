// Trivia Quiz Application
class TriviaQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.questions = [];
        this.currentSettings = {};
        this.playerName = '';
        this.timer = null;
        this.timeLeft = 0;
        this.answerTimes = [];
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadTheme();
        this.showScreen('startScreen');
    }

    setupEventListeners() {
        // Start form
        document.getElementById('startForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startQuiz();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // End screen buttons
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.showScreen('startScreen');
        });

        document.getElementById('shareScoreBtn').addEventListener('click', () => {
            this.shareScore();
        });
    }

    startQuiz() {
        const playerName = document.getElementById('playerName').value.trim();
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;

        if (!playerName || !category || !difficulty) {
            alert('Please fill in all fields');
            return;
        }

        this.playerName = playerName;
        this.currentSettings = difficultySettings[difficulty];
        
        // Get questions for selected category and difficulty
        this.questions = this.getQuestions(category, difficulty);
        
        // Reset game state
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.answerTimes = [];
        this.correctAnswers = 0;
        
        // Update UI
        document.getElementById('playerNameDisplay').textContent = this.playerName;
        this.updateScore();
        this.updateProgress();
        
        this.showScreen('quizScreen');
        this.loadQuestion();
    }

    getQuestions(category, difficulty) {
        const availableQuestions = quizData[category][difficulty];
        const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, this.totalQuestions);
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        // Update question text
        document.getElementById('questionText').textContent = question.question;
        
        // Generate options
        this.generateOptions(question);
        
        // Update progress
        this.updateProgress();
        
        // Start timer
        this.startTimer();
        
        // Hide feedback
        document.getElementById('feedbackContainer').classList.remove('show');
    }

    generateOptions(question) {
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        
        // Shuffle options
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.originalIndex = question.options.indexOf(option);
            
            optionElement.addEventListener('click', () => {
                this.selectAnswer(optionElement);
            });
            
            container.appendChild(optionElement);
        });
    }

    selectAnswer(selectedOption) {
        // Disable all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.style.pointerEvents = 'none');
        
        // Record answer time
        const answerTime = this.currentSettings.timeLimit - this.timeLeft;
        this.answerTimes.push(answerTime);
        
        // Check if answer is correct
        const originalIndex = parseInt(selectedOption.dataset.originalIndex);
        const question = this.questions[this.currentQuestion];
        const isCorrect = originalIndex === question.correct;
        
        // Update streak
        if (isCorrect) {
            this.streak++;
            this.correctAnswers++;
        } else {
            this.streak = 0;
        }
        
        // Calculate score
        const score = this.calculateScore(isCorrect, answerTime);
        this.score += score;
        
        // Show feedback
        this.showFeedback(isCorrect, question, selectedOption, options, score);
        
        // Play sound
        this.playSound(isCorrect);
        
        // Update score display
        this.updateScore();
        
        // Stop timer
        this.stopTimer();
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 3000);
    }

    calculateScore(isCorrect, answerTime) {
        if (!isCorrect) return 0;
        
        let score = this.currentSettings.baseScore;
        
        // Speed bonus (faster answers get more points)
        const timeBonus = Math.max(0, this.currentSettings.timeLimit - answerTime);
        const speedBonus = Math.floor(timeBonus * this.currentSettings.bonusMultiplier);
        score += speedBonus;
        
        // Streak bonus
        if (this.streak > 1) {
            score += this.currentSettings.streakBonus;
        }
        
        return score;
    }

    showFeedback(isCorrect, question, selectedOption, allOptions, score) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackText = document.getElementById('feedbackText');
        const explanation = document.getElementById('explanation');
        
        // Mark correct and incorrect answers
        allOptions.forEach(option => {
            const originalIndex = parseInt(option.dataset.originalIndex);
            if (originalIndex === question.correct) {
                option.classList.add('correct');
            } else if (option === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Show feedback text
        if (isCorrect) {
            feedbackText.textContent = `Correct! +${score} points`;
            feedbackText.style.color = 'var(--accent-success)';
        } else {
            feedbackText.textContent = 'Incorrect!';
            feedbackText.style.color = 'var(--accent-error)';
        }
        
        // Show explanation
        explanation.textContent = question.explanation;
        
        // Show feedback container
        feedbackContainer.classList.add('show');
    }

    startTimer() {
        this.timeLeft = this.currentSettings.timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.timeLeft;
        
        const timerContainer = document.querySelector('.timer');
        if (this.timeLeft <= 5) {
            timerContainer.classList.add('warning');
        } else {
            timerContainer.classList.remove('warning');
        }
    }

    timeUp() {
        this.stopTimer();
        
        // Mark all options as disabled
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Show correct answer
        const question = this.questions[this.currentQuestion];
        options.forEach(option => {
            const originalIndex = parseInt(option.dataset.originalIndex);
            if (originalIndex === question.correct) {
                option.classList.add('correct');
            }
        });
        
        // Show feedback
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackText = document.getElementById('feedbackText');
        const explanation = document.getElementById('explanation');
        
        feedbackText.textContent = 'Time\'s up!';
        feedbackText.style.color = 'var(--accent-error)';
        explanation.textContent = question.explanation;
        
        feedbackContainer.classList.add('show');
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 3000);
    }

    updateScore() {
        document.getElementById('currentScore').textContent = this.score;
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('questionCounter').textContent = `${this.currentQuestion + 1}/${this.totalQuestions}`;
    }

    endQuiz() {
        this.stopTimer();
        
        // Calculate final stats
        const accuracy = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        const fastestAnswer = Math.min(...this.answerTimes);
        const bestStreak = Math.max(...this.getStreaks());
        
        // Update end screen
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        document.getElementById('fastestAnswer').textContent = `${fastestAnswer}s`;
        document.getElementById('bestStreak').textContent = bestStreak;
        
        // Check for high score
        this.checkHighScore();
        
        this.showScreen('endScreen');
    }

    getStreaks() {
        const streaks = [];
        let currentStreak = 0;
        
        for (let i = 0; i < this.questions.length; i++) {
            const question = this.questions[i];
            const answerTime = this.answerTimes[i];
            
            if (answerTime > 0) { // Answered correctly
                currentStreak++;
            } else {
                if (currentStreak > 0) {
                    streaks.push(currentStreak);
                }
                currentStreak = 0;
            }
        }
        
        if (currentStreak > 0) {
            streaks.push(currentStreak);
        }
        
        return streaks.length > 0 ? streaks : [0];
    }

    checkHighScore() {
        const highScores = JSON.parse(localStorage.getItem('triviaHighScores') || '[]');
        const newScore = {
            name: this.playerName,
            score: this.score,
            date: new Date().toISOString()
        };
        
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        
        // Keep only top 10 scores
        const topScores = highScores.slice(0, 10);
        localStorage.setItem('triviaHighScores', JSON.stringify(topScores));
        
        // Check if this is a new high score
        if (topScores[0].name === this.playerName && topScores[0].score === this.score) {
            document.getElementById('celebration').classList.remove('hidden');
        }
    }

    shareScore() {
        const text = `I scored ${this.score} points on the Trivia Quiz! Can you beat my score? 🎯`;
        const url = encodeURIComponent(window.location.href);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
        window.open(twitterUrl, '_blank');
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle icon
        const themeBtn = document.getElementById('themeToggle');
        const icon = themeBtn.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeBtn = document.getElementById('themeToggle');
        const icon = themeBtn.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    playSound(isCorrect) {
        const sound = document.getElementById(isCorrect ? 'correctSound' : 'wrongSound');
        sound.currentTime = 0;
        sound.play().catch(() => {
            // Ignore errors if sound can't play
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TriviaQuiz();
});
