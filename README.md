# Color Quest 🎨

A fun and interactive color guessing game built with React and TypeScript.

## Overview

Color Quest is a game where players need to match the target color by selecting the correct option from a set of colored buttons arranged in a pentagon layout. Points are awarded for correct guesses, and the game features animations for both correct and incorrect attempts.

## Features

- Random color generation
- Score tracking
- Animated feedback
- Responsive design
- Pentagon-style button layout
- Mobile-friendly interface

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Uyimolo/hng-color-game.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Technologies Used

- React
- TypeScript
- CSS3 (with animations)
- Vite

## Project Structure

```
src/
├── App.tsx         # Main game component
├── App.css         # Styles
├── assets/
│   └── bg-pentagon.svg
└── utils/
    └── predefinedColors.ts
```

## Game Rules

1. A target color is randomly displayed at the top
2. Player must select the matching color from the pentagon options
3. Correct guesses increase the score
4. Wrong guesses trigger a shake animation
5. 'New Game' button resets the score

## License

MIT

---

Created for the HNG12 Stage 1 Frontend Intern Task
