import React, { useState, useEffect } from 'react';
import { Position } from '../types';

interface PowerPelletProps {
  position: Position;
}

const PowerPellet: React.FC<PowerPelletProps> = ({ position }) => {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const scaleInterval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.5 : 1);
    }, 400);

    const opacityInterval = setInterval(() => {
      setOpacity(prev => prev === 1 ? 0.5 : 1);
    }, 200);

    return () => {
      clearInterval(scaleInterval);
      clearInterval(opacityInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: '#ffff00',
        borderRadius: '50%',
        position: 'absolute',
        top: `${position.y * 40 + 10}px`,
        left: `${position.x * 40 + 10}px`,
        transform: `scale(${scale})`,
        opacity,
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 0 10px #ffff00'
      }}
    />
  );
};

export default PowerPellet; 