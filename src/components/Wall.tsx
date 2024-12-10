import React from 'react';
import { Position } from '../types';

interface WallProps {
  position: Position;
}

const Wall: React.FC<WallProps> = ({ position }) => {
  return (
    <div
      className="wall"
      style={{
        position: 'absolute',
        top: `${position.y * 40}px`,
        left: `${position.x * 40}px`,
        width: '40px',
        height: '40px',
        backgroundColor: 'blue'
      }}
    />
  );
};

export default Wall; 