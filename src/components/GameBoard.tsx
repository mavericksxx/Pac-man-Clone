import React from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Pellet from './Pellet';
import Wall from './Wall';
import { Position } from '../types';

interface GameBoardProps {
  pacmanPosition: Position;
  ghostPosition: Position;
  pellets: Position[];
  walls: Position[];
  onPacmanMove: (newPosition: Position) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  pacmanPosition,
  ghostPosition,
  pellets,
  walls,
  onPacmanMove
}) => {
  return (
    <div id="game-board">
      {walls.map((wall, index) => (
        <Wall key={`wall-${wall.x}-${wall.y}`} position={wall} />
      ))}
      {pellets.map((pellet, index) => (
        <Pellet key={`pellet-${pellet.x}-${pellet.y}`} position={pellet} />
      ))}
      <Pacman position={pacmanPosition} />
      <Ghost position={ghostPosition} />
    </div>
  );
};

export default GameBoard; 