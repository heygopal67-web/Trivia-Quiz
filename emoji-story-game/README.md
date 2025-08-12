# Emoji Story Game

A small React app with multiple mini‑games. currently im working on Guess the Movie, where you identify a movie, person, or event from a short emoji sequence.

## Games

- Four game modes: Guess the Movie, Word Scramble (under work), Math Puzzle (under work), Memory Game(under work)..

## Tech stack

- React (Create React App, react‑scripts 5)
- Tailwind CSS
- Testing Library (for React tests)

## Requirements

- Node.js 16 or higher
- npm

## Setup

   ```bash
   cd emoji-story-game
   npm install
   npm start
   ```

Open `http://localhost:3000` in your browser.

## How to play (Guess the Movie)

1. From the menu, choose Guess the Movie.
2. Select a category (or leave All) and press Start Game.
3. Look at the emoji sequence and pick the correct answer before the timer ends.
4. You earn 10 points plus the remaining seconds when correct.
5. There are up to 10 rounds per session. Your final score is shown at the end.

## Configuration (optional)

- API key: If you have an API Ninjas key, add it in `src/api.js` to fetch emojis from the API. The game works without a key using built‑in fallbacks.
- Assets: Images and audio are served from `public/` (for example `bg.gif`, `night.gif`, `tree.gif`, `movie.png`, `word.png`, `bgm.mp3`).

## Project structure (high level)

```
emoji-story-game/
  public/          # static assets
  src/
    api.js         # optional API integration + fallbacks
    data.js        # puzzle definitions (keywords, answer, hint, category)
    components/
      Game.js          # main game controller (modes, timer, scoring)
      GameSelector.js  # game mode menu (includes day/night + sound toggles)
      StartScreen.js   # start screen for Guess the Movie (category selector)
      EmojiDisplay.js  # renders the emoji sequence
      AnswerInput.js   # multiple‑choice answers
      Timer.js         # circular countdown display
      GameOver.js      # final score screen
```

## Customization

- Puzzles: Edit `src/data.js`. Each entry contains `keywords`, `answer`, `hint`, and `category`.
- Rounds and timer: In `src/components/Game.js`, adjust `MAX_ROUNDS` and the initial timer value (15 seconds).
- Styling: Tailwind classes are used throughout the components.

## Available scripts

- `npm start`: run the app in development mode
- `npm test`: run tests
- `npm run build`: build for production
- `npm run eject`: eject CRA (irreversible)

## Build and deploy

```bash
npm run build
```

The production build is created in the `build/` folder and can be deployed to any static hosting service (for example Netlify, Vercel, or GitHub Pages).

## Troubleshooting

- Install errors: ensure Node.js 16+ and a clean install (`node_modules` removed, then `npm install`).
- Dev server port in use: change the port (for example, in PowerShell: `$env:PORT=3001; npm start`).
- Emoji fetching: without an API key the app uses fallbacks; with a key, verify it is set in `src/api.js` and your network allows requests to the API.

## License

MIT


thanks for reading this readme... hope you enjoyed the game and would love to know your feedback...

thanks again :)
