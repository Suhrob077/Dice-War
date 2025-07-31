import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/playSound'; // ✅ Tovush funksiyasi
import './Home.css';
import { Link } from "react-router-dom";  

const Home = () => {
  const [name, setName] = useState('');
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const navigate = useNavigate();

  const handleStart = () => {
    playSound('../../../public/sounds/button-305770.mp3'); // ✅ Tovush qo‘shildi
    setPlayerName(name);
    navigate('/select');
  };

  const handlePrank = () => {
    playSound('../../../public/sounds/button-305770.mp3'); // ✅ Tovush qo‘shildi
    navigate('/top-player');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🎲 Dice War</h1>
      <p className="home-subtitle">Qahramon Bo`lish uchun ismingni yoz! va Sarguzashtni boshla !</p>

      <input
        type="text"
        className="home-input"
        placeholder="Isminggizni kiriting..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className='starts'>

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

