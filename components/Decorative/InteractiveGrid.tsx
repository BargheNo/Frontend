"use client";
import React from "react";

interface InteractiveGridProps {
  rows: number;
  cols: number;
  size: number; // size in pixels for both width and height
}

const cursorGlowStyle: React.CSSProperties = {
  height: '300px',
  width: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle at center, rgba(255, 250, 231, 0.4) 0%, rgba(255, 250, 231, 0) 60%)',
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 1,
  transform: 'translate(-50%, -50%)',
  opacity: 0.5,
  transition: 'opacity 0.2s ease'
};

const InteractiveGrid: React.FC<InteractiveGridProps> = ({ rows, cols, size }) => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const glowElement = event.currentTarget.querySelector('.cursorGlow') as HTMLElement;
    if (glowElement) {
      glowElement.style.left = x + 'px';
      glowElement.style.top = y + 'px';
    }
  };

  return (
    <div className="relative w-fit overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex gap-0.5">
            {Array.from({ length: cols }).map((_, indexIn) => (
              <div
                key={indexIn}
                className="bg-gradient-to-br from-[#1d2441] to-[#111219] rounded"
                style={{ height: `${size}px`, width: `${size}px` }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="cursorGlow" style={cursorGlowStyle} />
    </div>
  );
};

export default InteractiveGrid;