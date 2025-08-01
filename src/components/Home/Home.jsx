import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/playSound'; // ✅ To'g'ri import
import './Home.css';

const Home = () => {
  const [name, setName] = useState('');
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const navigate = useNavigate();

  const handleStart = () => {
    playSound('button-305770.mp3'); // ✅ To'g'ri yo'l
    setPlayerName(name);
    navigate('/select');
  };

  const handlePrank = () => {
    playSound('button-305770.mp3'); // ✅ To'g'ri yo'l
    navigate('/top-player');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🎲 Dice War</h1>
      <p className="home-subtitle">Qahramon bo‘lish uchun ismingni yoz va sarguzashtni boshlang!</p>

      <input
        type="text"
        className="home-input"
        placeholder="Ismingizni kiriting..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="starts">
        <Link to="/abought">
          <button className="about-btn">ℹ️ O‘yin haqida</button>
        </Link>

        <button className="prank-button" onClick={handlePrank}>
          🏆 Rank
        </button>
      </div>

      <button
        className="home-button"
        onClick={handleStart}
        disabled={!name}
      >
        Boshlash
      </button>
    </div>
  );
};

export default Home;