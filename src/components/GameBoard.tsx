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
  onPacmanMove: (newPosition: Position) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  pacmanPosition,
  ghostPosition,
  pellets,
  onPacmanMove
}) => {
  return (
    <div id="game-board">
      <Pacman position={pacmanPosition} />
      <Ghost position={ghostPosition} />
      {pellets.map((pellet, index) => (
        <Pellet key={`${pellet.x}-${pellet.y}`} position={pellet} />
      ))}
      {/* Walls will be rendered based on grid */}
    </div>
  );
};

export default GameBoard; 