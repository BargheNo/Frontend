"use client";
import React from "react";
import styles from "@/app/style-showcasing/styles.module.css";

interface InteractiveGridProps {
  rows: number;
  cols: number;
  size: number; // size in pixels for both width and height
}

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

      <div className={`cursorGlow ${styles.cursorGlow}`} />
    </div>
  );
};

export default InteractiveGrid; 