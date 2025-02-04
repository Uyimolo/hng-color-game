// import { useState } from 'react';

import { useEffect, useState } from 'react';
import './App.css';
import { predefinedColors } from './utils/predefinedColors';

import pentagon from './assets/bg-pentagon.svg';
type predefinedColor = {
  color: string;
  darkerShade: string;
};

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [colors, setColors] = useState<predefinedColor[]>();
  const [gameStatus, setGameStatus] = useState<'success' | 'wrong' | ''>('');
  const [score, setScore] = useState(0);
  const [canClick, setCanClick] = useState(false);

  const newGame = () => {
    setScore(0);

    setTimeout(generateColors, 10);
  };

  useEffect(() => {
    newGame();
  }, []);

  const generateColors = () => {
    // reset game status
    setGameStatus('');

    const shuffledColors = [...predefinedColors]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    // pick a random color from the shuffled colors array as the target color
    const targetColor =
      shuffledColors[Math.floor(Math.random() * shuffledColors.length)].color;

    setColors(shuffledColors);
    setTargetColor(targetColor);

    // enable clicks
    setCanClick(true);
  };

  const handleColorClick = (color: string) => {
    // make sure clicks are triggered only when the game is not in any status state
    if (!canClick) return;

    if (color === targetColor) {
      // disable clicks to avoid score been incremented multiple times
      setCanClick(false);
      setGameStatus('success');
      setScore((prev) => prev + 1);
      setTimeout(generateColors, 1000);
    } else {
      setGameStatus('wrong');
      setTimeout(() => setGameStatus(''), 1000);
    }
  };

  return (
    <div className={`${gameStatus} app`}>
      <h1>Color Quest</h1>

      <div className='header'>
        <h1>Color Quest</h1>
        <div
          className='target-color'
          data-testid='colorBox'
          style={{ backgroundColor: targetColor }}>
          <p>Target Color</p>
        </div>

        <div className='score-box'>
          <p className='score-title'>Score</p>
          <p className='score' data-testid='score'>
            {score}
          </p>
        </div>
      </div>

      <div className='game-status'>
        <p data-testid='gameStatus'>
          {gameStatus === 'success'
            ? "🎉 Nailed it! You're a color genius! 🎨"
            : gameStatus === 'wrong'
            ? '❌ Oops! Try again, you got this! 💪'
            : ''}
        </p>
      </div>

      <p className='instruction' data-testid='gameInstructions'>
        Click on the colored button that matches the target color{' '}
        <span>below</span>
      </p>

      <div className='color-options'>
        <img src={pentagon} alt='pentagon image' className='pentagon' />
        {colors?.map((colorObj, index) => (
          <button
            className={`color-option color-${index}`}
            key={index}
            onClick={() => handleColorClick(colorObj.color)}
            disabled={gameStatus === 'success'}
            data-testid='colorOption'
            style={{
              backgroundColor: colorObj.color,
              boxShadow: `3px 6px 1px ${colorObj.darkerShade}`,
              border: `1px solid ${colorObj.darkerShade}`,
            }}>
            <span className='hollow-inner'></span>
          </button>
        ))}
      </div>

      {
        <button
          className='new-game'
          onClick={newGame}
          data-testid='newGameButton'>
          New Game
        </button>
      }
    </div>
  );
}

export default App;
