import React from 'react';
import { Position } from '../types';

interface PelletProps {
  position: Position;
}

const Pellet: React.FC<PelletProps> = ({ position }) => {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'white',
        borderRadius: '50%',
        position: 'absolute',
        top: `${position.y * 40 + 15}px`,
        left: `${position.x * 40 + 15}px`
      }}
    />
  );
};

export default Pellet; 