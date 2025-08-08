# 🎯 Trivia Quiz Web App

A modern, responsive trivia quiz application built with vanilla HTML, CSS, and JavaScript. Features a beautiful glassmorphism design, dark/light theme support, and comprehensive scoring system.

## ✨ Features

### 🎮 Game Features
- **Start Screen**: Player name input and category/difficulty selection
- **Category Selection**: General Knowledge, Sports, Movies, Science
- **Difficulty Levels**: Easy, Medium, Hard with different time limits and scoring
- **Multiple Choice Questions**: 4 options with random order
- **Timer System**: Visual countdown with warning indicators
- **Progress Tracking**: Real-time progress bar and question counter
- **API Integration**: Real-time questions from Open Trivia Database
- **Offline Fallback**: Local questions when API is unavailable

### 🏆 Scoring System
- **Base Points**: 10 (Easy), 15 (Medium), 20 (Hard)
- **Speed Bonus**: Faster answers earn more points
- **Streak Bonus**: Consecutive correct answers provide bonus points
- **High Score Tracking**: Local storage for persistent high scores

### 🎨 Design Features
- **Glassmorphism UI**: Modern glass-like card effects
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Question transitions and option selection
- **Sound Effects**: Audio feedback for correct/incorrect answers

### 📊 End Screen Features
- **Final Score**: Total points earned
- **Accuracy Percentage**: Correct answers ratio
- **Fastest Answer Time**: Quickest response recorded
- **Best Streak**: Longest consecutive correct answers
- **High Score Celebration**: Special animation for new records
- **Share Score**: Twitter integration for score sharing

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing!

### File Structure
```
Trivia Quiz/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and themes
├── data.js            # Fallback quiz questions and difficulty settings
├── api.js             # API service for fetching questions
├── app.js             # Main JavaScript application
└── README.md          # This documentation
```

## 🎯 How to Play

1. **Enter Your Name**: Start by entering your name
2. **Select Category**: Choose from General Knowledge, Sports, Movies, or Science
3. **Choose Difficulty**: Pick Easy, Medium, or Hard
4. **Answer Questions**: Click on the correct answer before time runs out
5. **Earn Points**: Get points for correct answers, speed bonuses, and streaks
6. **View Results**: See your final score and statistics
7. **Share Score**: Share your achievement on Twitter

## 🎨 Customization

### API Integration
The app uses the Open Trivia Database API for real-time questions. The API service (`api.js`) handles:
- Fetching questions by category and difficulty
- HTML entity decoding
- Answer shuffling
- Fallback to local questions if API fails

### Adding New Questions (Fallback)
Edit `data.js` to add fallback questions:

```javascript
{
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0, // Index of correct answer (0-3)
    explanation: "Explanation of the answer"
}
```

### Modifying Difficulty Settings
Adjust time limits and scoring in `data.js`:

```javascript
const difficultySettings = {
    easy: {
        timeLimit: 30,        // Seconds per question
        baseScore: 10,        // Base points for correct answer
        bonusMultiplier: 1.5, // Speed bonus multiplier
        streakBonus: 2        // Bonus points for streaks
    }
    // ... other difficulties
};
```

### Theme Customization
Modify CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;    /* Primary accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent color */
    --accent-success: #10b981;    /* Success color */
    --accent-error: #ef4444;      /* Error color */
    /* ... other variables */
}
```

## 🛠️ Technical Details

### Architecture
- **Modular Design**: Clean, organized code structure
- **Object-Oriented**: Main TriviaQuiz class for game logic
- **Event-Driven**: Responsive user interactions
- **Local Storage**: Persistent high scores and theme preferences

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized animations using CSS transforms
- Efficient DOM manipulation
- Minimal memory usage
- Fast loading times

## 🎮 Game Mechanics

### Scoring Breakdown
- **Correct Answer**: Base points (varies by difficulty)
- **Speed Bonus**: Extra points for quick answers
- **Streak Bonus**: Additional points for consecutive correct answers
- **Time Penalty**: No points for incorrect or timed-out answers

### Difficulty Differences
| Difficulty | Time Limit | Base Score | Speed Bonus | Streak Bonus |
|------------|------------|------------|-------------|--------------|
| Easy       | 30 seconds | 10 points  | 1.5x        | 2 points     |
| Medium     | 25 seconds | 15 points  | 2.0x        | 3 points     |
| Hard       | 20 seconds | 20 points  | 2.5x        | 5 points     |

## 🔧 Development

### Code Structure
- **HTML**: Semantic markup with accessibility features
- **CSS**: Modern CSS with custom properties and animations
- **JavaScript**: ES6+ features with modular class structure

### Key Functions
- `startQuiz()`: Initialize game with selected settings
- `loadQuestion()`: Display current question and options
- `calculateScore()`: Compute points based on performance
- `endQuiz()`: Calculate final statistics and show results

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🎨 Theme System

### Light Theme
- Clean, bright interface
- High contrast for readability
- Professional appearance

### Dark Theme
- Easy on the eyes
- Reduced blue light exposure
- Modern aesthetic

## 🚀 Future Enhancements

Potential improvements for future versions:
- [ ] More question categories
- [ ] Multiplayer support
- [ ] Leaderboard system
- [ ] Question difficulty adaptation
- [ ] Audio questions
- [ ] Image-based questions
- [ ] Export/import quiz data
- [ ] Offline support with service workers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Enjoy playing the Trivia Quiz! 🎯**
