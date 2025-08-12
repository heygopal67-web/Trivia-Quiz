# Guess the Emoji Story 🎮

A fun React web game where players guess movies, famous people, or historical events based on emoji sequences!

## 🚀 Features

- **Emoji Puzzles**: 10 challenging puzzles with emoji sequences
- **Timer System**: 15-second countdown for each puzzle
- **Scoring System**: 
  - +10 points for correct answers
  - +remaining seconds as bonus points
  - -5 points for using hints
- **Hint System**: Get help at the cost of 5 points
- **Beautiful UI**: Modern design with Tailwind CSS
- **Responsive Design**: Works on all device sizes
- **Animations**: Smooth transitions and feedback effects

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **API Ninjas** - Emoji API for dynamic emoji fetching
- **Vanilla JavaScript** - No backend required

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- API Ninjas API key (free at [api-ninjas.com](https://api-ninjas.com))

## 🔧 Installation

1. **Clone or download the project**
   ```bash
   cd emoji-story-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**
   - Open `src/api.js`
   - Replace `"YOUR_API_KEY_HERE"` with your actual API Ninjas key
   - Save the file

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start playing!

## 🎯 How to Play

1. **Look at the emoji sequence** displayed at the top
2. **Type your answer** in the input field
3. **Submit your answer** before the 15-second timer runs out
4. **Use hints** if you're stuck (costs 5 points)
5. **Score points** based on correct answers and remaining time
6. **Complete all puzzles** to see your final score

## 🏆 Scoring System

- **Correct Answer**: +10 points
- **Time Bonus**: +remaining seconds
- **Hint Used**: -5 points
- **Time's Up**: +0 points

## 🎨 Customization

### Adding New Puzzles
Edit `src/data.js` to add more puzzles:
```javascript
{
  keywords: ["your", "keywords", "here"],
  answer: "Your Answer Here",
  hint: "Your hint here"
}
```

### Changing Game Settings
Modify the timer duration, scoring, or other game mechanics in the respective component files.

### Styling
The app uses Tailwind CSS classes. Modify the classes in component files to change colors, spacing, and animations.

## 🚀 Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `build` folder, ready for deployment.

## 🌐 Deployment

Since this is a client-side only app, you can deploy it to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## 🔍 Troubleshooting

### API Key Issues
- Ensure your API key is correctly inserted in `src/api.js`
- Check that your API Ninjas account is active
- The app includes fallback emojis if the API fails

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 16 or higher
- Check for any console errors in the browser

### Performance Issues
- The app is optimized for modern browsers
- Emojis are cached after first fetch
- Fallback emojis ensure the game always works

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the game!

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy the Game!

Have fun guessing emoji stories and challenge your friends to beat your high score!
