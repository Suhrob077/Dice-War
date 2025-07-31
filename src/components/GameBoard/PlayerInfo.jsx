// src/pages/PlayerInfo.jsx
import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import charactersData from '../../../public/Data/Character.json';
import './PlayerInfo.css';
import PCOIN from './Icons/coin1.png';

const PlayerInfo = () => {
  const {
    playerName,
    character,
    stats,
    gold,
    isSkillReady,
    resetSkillCooldown,
    extraSkills,
    useGoldDice,
  } = useGameStore();

  const selectedCharacter = charactersData.find(c => c.id === character);

  if (!character || !stats) return null;

  return (
    <div className="player-info">
      <div className='Info-N-G'>
        <h2>👤 {playerName || 'O‘yinchi'}</h2>
        <h1 className='Coin'>{gold} <img className='P-Coin' src={PCOIN} alt="" /> </h1>
      </div>

      <div className="character-section">
        <p>Qahramon - {selectedCharacter.name}</p>
      </div>

      <div className="stats">
        <p>❤️ Jon: {stats.health}</p>
        <p>🗡️ Ataka: {stats.attack}</p>
        <p>🛡️ Himoya: {stats.defense}</p>
      </div>

      <div className="skill-section">
        <button 
          onClick={resetSkillCooldown}
          disabled={!isSkillReady}
          className={isSkillReady ? 'skill-ready' : 'skill-disabled'}
        >
          ✨ Skill: {selectedCharacter.skill}
        </button>
        <div className="skill-status">
           <p style={{ color: isSkillReady ? 'limegreen' : 'gray' }}>
             {isSkillReady ? 'Tayyor' : 'Kutish...'}
           </p>
        </div>

      </div>
    </div>
  );
};

export default PlayerInfo;
