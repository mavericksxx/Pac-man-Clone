import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import { Position } from '../types';
import { GRID } from '../constants';

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [pacmanPosition, setPacmanPosition] = useState<Position>({ x: 1, y: 1 });
  const [ghostPosition, setGhostPosition] = useState<Position>({ x: 18, y: 18 });
  const [pellets, setPellets] = useState<Position[]>([]);
  const [walls, setWalls] = useState<Position[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize walls and pellets from GRID
  useEffect(() => {
    const initialPellets: Position[] = [];
    const initialWalls: Position[] = [];

    GRID.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          initialWalls.push({ x, y });
        } else if (cell === 0) {
          initialPellets.push({ x, y });
        }
      });
    });

    setWalls(initialWalls);
    setPellets(initialPellets);
  }, []);

  const handlePacmanMove = useCallback((newPosition: Position) => {
    // Check if the move is valid (not hitting a wall)
    if (GRID[newPosition.y][newPosition.x] !== 1) {
      setPacmanPosition(newPosition);
      
      // Check for pellet collection
      const pelletIndex = pellets.findIndex(
        p => p.x === newPosition.x && p.y === newPosition.y
      );
      
      if (pelletIndex !== -1) {
        setScore(prev => prev + 10);
        setPellets(prev => prev.filter((_, i) => i !== pelletIndex));
      }
      
      // Check for collision with ghost
      if (newPosition.x === ghostPosition.x && newPosition.y === ghostPosition.y) {
        setIsGameOver(true);
      }
    }
  }, [ghostPosition, pellets]);

  return (
    <div>
      <ScoreBoard score={score} />
      <GameBoard
        pacmanPosition={pacmanPosition}
        ghostPosition={ghostPosition}
        pellets={pellets}
        walls={walls}
        onPacmanMove={handlePacmanMove}
      />
      {isGameOver && <GameOver score={score} />}
    </div>
  );
};

export default Game; 