// src/components/Player.jsx
import React from 'react';
import './Player.css';

const TILE_SIZE = 50;
const COLS = 10;

function getPlayerPosition(index) {
  const row = Math.floor(index / COLS);
  const colInRow = index % COLS;
  const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
  const top = row * TILE_SIZE;
  const left = col * TILE_SIZE;
  return { top, left };
}

const Player = ({ position, sprite }) => {
  const { top, left } = getPlayerPosition(position);

  return (
    <div
      className="player"
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        transition: 'top 2s linear, left 2s linear',
        zIndex: 5
      }}
    >
      <img
        src={sprite}
        alt="Player"
        draggable={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Player;
