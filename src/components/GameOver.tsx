import React from 'react';

interface GameOverProps {
  score: number;
}

const GameOver: React.FC<GameOverProps> = ({ score }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
    </div>
  );
};

export default GameOver; 