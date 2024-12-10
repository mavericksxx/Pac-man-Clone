import React from 'react';
import { Position } from '../types';

interface PacmanProps {
  position: Position;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const Pacman: React.FC<PacmanProps> = ({ position, direction = 'right' }) => {
  const getRotation = () => {
    switch (direction) {
      case 'up': return -90;
      case 'down': return 90;
      case 'left': return 180;
      case 'right': return 0;
    }
  };

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        position: 'absolute',
        top: `${position.y * 40}px`,
        left: `${position.x * 40}px`,
        transform: `rotate(${getRotation()}deg)`,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="yellow" />
        <path
          d="M20 20 L15 5 A18 18 0 1 1 25 5 Z"
          fill="yellow"
          stroke="black"
          strokeWidth="1"
        />
        <circle cx="15" cy="15" r="3" fill="black" />
      </svg>
    </div>
  );
};

export default Pacman; 