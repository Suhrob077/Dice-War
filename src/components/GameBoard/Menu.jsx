import React from 'react';
import './Menu.css';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/playSound';

const Menu = ({ onAction, gameOver }) => {
  const stats = useGameStore(state => state.stats);

  const handleClick = (actionType) => {
    playSound('../../../public/sounds/button-305770.mp3'); // bu yerda 'click' — bu tovush fayl nomi yoki identifikatori
    onAction(actionType);
  };

  return (
    <div className="menu-panel">
      <h2 className="menu-title">☰ O‘yin Menyusi</h2>

      {gameOver ? (
        <div className="game-over-message">
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
            ☠️ Siz yutqazdingiz!
          </p>
          <p style={{ color: 'white', marginBottom: '10px' }}>
            🧍‍♂️ HP: 0
          </p>
        </div>
      ) : (
        <button onClick={() => handleClick('resume')}>🕹 Davom etish</button>
      )}

      <button onClick={() => handleClick('restart')}>🔄 Qayta boshlash</button>
      <button onClick={() => handleClick('exit')}>🚪 Chiqish</button>
    </div>
  );
};

export default Menu;
