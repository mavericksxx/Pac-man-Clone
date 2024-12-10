import React from 'react';
import { Position } from '../types';

interface GhostProps {
  position: Position;
  vulnerable?: boolean;
}

const Ghost: React.FC<GhostProps> = ({ position, vulnerable = false }) => {
  const color = vulnerable ? 'blue' : 'red';

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: color,
        borderRadius: '50% 50% 0 0',
        position: 'absolute',
        top: `${position.y * 40}px`,
        left: `${position.x * 40}px`,
      }}
    >
      <div className="ghost-skirt" />
      <div className="ghost-eyes">
        <div className="ghost-eye" />
        <div className="ghost-eye" />
      </div>
    </div>
  );
};

export default Ghost; 