// import { useState } from 'react';

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'success' | 'wrong' | ''>('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const newGame = () => {
    setRound(1);
    setScore(0);
    generateColors();
  };

  useEffect(() => {
    newGame();
  }, []);

  // check if the game is over (when round is greater than 10)
  useEffect(() => {
    if (round > 10) {
      alert(`Game Over! Your final score is ${score}`);
      newGame();
    }
  }, [round]);

  const generateColors = () => {
    // reset game status
    setGameStatus('');

    // Generate an array of 5 random hex colors
    const colors = Array.from(
      { length: 5 },
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`
    );

    // pick a random color from the colors array as the target color
    const targetColor = colors[Math.floor(Math.random() * colors.length)];

    // update colors array and target color state
    setColors(colors);
    setTargetColor(targetColor);
  };

  const handleColorClick = (color: string) => {
    // make sure clicks are triggered only when the game is not in any status state
    if (gameStatus !== '') return;

    if (color === targetColor) {
      setGameStatus('success');
      setScore(score + 1);
      setTimeout(() => {
        generateColors();
      }, 500);
    } else {
      setGameStatus('wrong');
      setTimeout(() => {
        setGameStatus('');
      }, 500);
    }

    // increment game round
    setRound(round + 1);
  };

  return (
    <div className={gameStatus + ' ' + 'app'}>
      <div className=''>
        <div className=''>
          <h1>Color Quest</h1>
        </div>

        <div className='game-container'>
          {/* score */}
          <div className='score'>
            <p>Score: {score}</p>
            <p>Round: {round}</p>
          </div>
          {/* target color */}
          <div
            className='target-color'
            style={{ backgroundColor: targetColor }}>
            {/* {targetColor} */}
            <span className={'target-color-text' + ' ' + gameStatus}>
              {gameStatus === 'success'
                ? 'Correct'
                : gameStatus === 'wrong'
                ? 'Not correct'
                : 'Target Color'}
            </span>
          </div>

          <p className='instruction'>
            Click on the colored button that matches the target color below
          </p>

          {/* color options */}
          <div className='color-options'>
            {colors.map((color, index) => (
              <button
                className='color-option'
                key={index}
                onClick={() => handleColorClick(color)}
                disabled={gameStatus === 'success' || gameStatus === 'wrong'}
                style={{ backgroundColor: color }}>
                {/* {color} */}
              </button>
            ))}
          </div>

          {round !== 1 && (
            <button className='new-game-btn' onClick={newGame}>
              Restart Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
