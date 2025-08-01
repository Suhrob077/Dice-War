// src/components/DiceRoller.jsx
import React, { useState } from 'react';
import './DiceRoller.css';
import { playSound } from '../../utils/playSound';
import dice1 from './Icons/dice1.png';
import dice2 from './Icons/dice2.png';
import dice3 from './Icons/dice3.png';
import dice4 from './Icons/dice4.png';
import dice5 from './Icons/dice5.png';
import dice6 from './Icons/dice6.png';


// 6 ta rasm linkini shu yerga joylashtiring:
const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const DiceRoller = ({ onRoll }) => {
  const [rolling, setRolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(null);

  const rollDice = () => {
    setRolling(true);
    setFinalIndex(null);
    playSound('pebble-spin-001-89320.mp3')
    const randomIndex = Math.floor(Math.random() * 6); // 0 to 5
    let interval = 100;
    let totalTime = 3000;
    let elapsed = 0;

    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 6);
      elapsed += interval;

      if (elapsed >= totalTime) {
        clearInterval(intervalId);
        setRolling(false);
        setCurrentIndex(randomIndex);
        setFinalIndex(randomIndex);

        // 👉 Faqat animatsiyadan keyin chaqiriladi
        onRoll && onRoll(randomIndex + 1);
      }
    }, interval);
  };

  return (
    <div className="dice-roller">
      <img
        src={diceImages[currentIndex]}
        alt={`Dice ${currentIndex + 1}`}
        className={`dice-image ${rolling ? 'spinning' : ''}`}
      />
      <button onClick={rollDice} disabled={rolling} className="roll-btn">
        {rolling ? 'Rolling...' : '🎲 Roll Dice'}
      </button>
      {finalIndex !== null && (
        <h3 className="result">-- {finalIndex + 1}</h3>
      )}
    </div>
  );
};

export default DiceRoller;
