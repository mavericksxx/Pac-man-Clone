import React, { useState, useEffect } from 'react';
import Pacman from './components/Pacman';
import Ghost from './components/Ghost';
import Pellet from './components/Pellet';
import PowerPellet from './components/PowerPellet';
import { Position } from './types';
import { GRID, CELL_SIZE } from './constants';
import './App.css';

const App: React.FC = () => {
  const [pacmanPosition, setPacmanPosition] = useState<Position>({ x: 1, y: 1 });
  const [pacmanDirection, setPacmanDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [ghostPosition, setGhostPosition] = useState<Position>({ x: 18, y: 17 });
  const [pellets, setPellets] = useState<Position[]>([]);
  const [powerPellets, setPowerPellets] = useState<Position[]>([
    { x: 1, y: 3 }, { x: 18, y: 3 }, { x: 1, y: 17 }, { x: 18, y: 17 }
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ghostVulnerable, setGhostVulnerable] = useState(false);

  // Initialize pellets
  useEffect(() => {
    const initialPellets: Position[] = [];
    GRID.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) {
          initialPellets.push({ x, y });
        }
      });
    });
    setPellets(initialPellets);
  }, []);

  // Check if move is valid (no wall collision)
  const canMove = (position: Position): boolean => {
    return GRID[position.y]?.[position.x] !== 1;
  };

  // Handle pellet collection
  const checkPelletCollection = (position: Position) => {
    const pelletIndex = pellets.findIndex(
      p => p.x === position.x && p.y === position.y
    );
    if (pelletIndex !== -1) {
      const newPellets = [...pellets];
      newPellets.splice(pelletIndex, 1);
      setPellets(newPellets);
      setScore(prev => prev + 10);
    }
  };

  const handlePowerPellet = (position: Position) => {
    const powerPelletIndex = powerPellets.findIndex(
      p => p.x === position.x && p.y === position.y
    );
    if (powerPelletIndex !== -1) {
      const newPowerPellets = [...powerPellets];
      newPowerPellets.splice(powerPelletIndex, 1);
      setPowerPellets(newPowerPellets);
      setScore(prev => prev + 50);
      setGhostVulnerable(true);
      setTimeout(() => setGhostVulnerable(false), 10000); // 10 seconds of vulnerability
    }
  };

  // Move ghost using simple chase logic
  useEffect(() => {
    const moveGhost = () => {
      if (gameOver) return;

      const dx = pacmanPosition.x - ghostPosition.x;
      const dy = pacmanPosition.y - ghostPosition.y;
      
      const newPosition = { ...ghostPosition };
      
      if (Math.abs(dx) > Math.abs(dy)) {
        newPosition.x += dx > 0 ? 1 : -1;
      } else {
        newPosition.y += dy > 0 ? 1 : -1;
      }

      if (canMove(newPosition)) {
        setGhostPosition(newPosition);
      }
    };

    const ghostInterval = setInterval(moveGhost, 500);
    return () => clearInterval(ghostInterval);
  }, [ghostPosition, pacmanPosition, gameOver]);

  // Check for collision with ghost
  useEffect(() => {
    if (pacmanPosition.x === ghostPosition.x && pacmanPosition.y === ghostPosition.y) {
      setGameOver(true);
    }
  }, [pacmanPosition, ghostPosition]);

  // Handle keyboard input
  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameOver) return;

    const newPosition = { ...pacmanPosition };
    let newDirection = pacmanDirection;

    switch (event.key) {
      case 'ArrowUp':
        newPosition.y -= 1;
        newDirection = 'up';
        break;
      case 'ArrowDown':
        newPosition.y += 1;
        newDirection = 'down';
        break;
      case 'ArrowLeft':
        newPosition.x -= 1;
        newDirection = 'left';
        break;
      case 'ArrowRight':
        newPosition.x += 1;
        newDirection = 'right';
        break;
      default:
        return;
    }

    if (canMove(newPosition)) {
      setPacmanPosition(newPosition);
      setPacmanDirection(newDirection);
      checkPelletCollection(newPosition);
      handlePowerPellet(newPosition);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [pacmanPosition, gameOver]);

  return (
    <div className="App">
      <h1>Pac-Man Game Using BFS</h1>
      <div className="score">Score: {score}</div>
      <div id="game-board">
        {pellets.map((pellet, index) => (
          <Pellet key={`${pellet.x}-${pellet.y}`} position={pellet} />
        ))}
        {powerPellets.map((pellet, index) => (
          <PowerPellet key={`power-${pellet.x}-${pellet.y}`} position={pellet} />
        ))}
        <Pacman position={pacmanPosition} direction={pacmanDirection} />
        <Ghost position={ghostPosition} vulnerable={ghostVulnerable} />
        {gameOver && <div className="game-over">Game Over!</div>}
      </div>
    </div>
  );
};

export default App; 