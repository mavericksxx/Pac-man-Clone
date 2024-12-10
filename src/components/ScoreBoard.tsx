import React from 'react';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div id="score-board">
      Score: <span>{score}</span>
    </div>
  );
};

export default ScoreBoard; 