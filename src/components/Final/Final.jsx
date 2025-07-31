import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import './Final.css';
import Save from './Save';
import dice1 from '../GameBoard/Icons/dice1.png';
import dice2 from '../GameBoard/Icons/dice2.png';
import dice3 from '../GameBoard/Icons/dice3.png';
import dice4 from '../GameBoard/Icons/dice4.png';
import dice5 from '../GameBoard/Icons/dice5.png';
import dice6 from '../GameBoard/Icons/dice6.png';
import battle from '../../assets/1643160.png'

const Final = () => {
  const navigate = useNavigate();
  const {
    stats,
    character,
    playerName,
    resetGame,
    fullResetGame,
  } = useGameStore();

  const [battleStarted, setBattleStarted] = useState(false);
  const [result, setResult] = useState(null);
  const [playerRoll, setPlayerRoll] = useState(null);
  const [dragonRoll, setDragonRoll] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

  const dragonStats = { health: 300, attack: 300, defense: 300 };

  useEffect(() => {
    if (!stats || !character) {
      navigate('/');
    }
  }, [stats, character, navigate]);

  const startBattle = () => {
    setBattleStarted(true);

    const playerPower = stats.health + stats.attack + stats.defense;
    const dragonPower = dragonStats.health + dragonStats.attack + dragonStats.defense;

    console.log('👤 Player Stats:', stats);
    console.log('🐉 Dragon Stats:', dragonStats);
    console.log('⚔️ Player Power:', playerPower);
    console.log('🔥 Dragon Power:', dragonPower);

    const playerDice = playerPower >= dragonPower ? 6 : 1;
    const dragonDice = playerPower >= dragonPower ? 1 : 6;

    console.log('🎲 Player Dice Roll:', playerDice);
    console.log('🎲 Dragon Dice Roll:', dragonDice);

    setTimeout(() => {
      setPlayerRoll(playerDice);
      setDragonRoll(dragonDice);
      const finalResult = playerDice > dragonDice ? 'win' : 'lose';
      setResult(finalResult);
      console.log('🏁 Battle Result:', finalResult);
    }, 2000);
  };

  const handleRestart = () => {
    resetGame();
    navigate('/select');
  };

  const handleExit = () => {
    fullResetGame();
    navigate('/');
  };

  useEffect(() => {
    console.log('🆕 Result state changed:', result);
  }, [result]);

  return (
    <div className="final-container">
      <h1 className="final-title">🔥 Last-Fight 🔥</h1>

      <div className="battle-area">
        <div className="side player-side">
          <h2>{playerName} ({character})</h2>
          <p>❤️ Health: {stats.health}</p>
          <p>🗡️ Attack: {stats.attack}</p>
          <p>🛡️ Defense: {stats.defense}</p>
          {playerRoll && (
            <div className="dice">
              <img src={diceImages[playerRoll]} alt={`Dice ${playerRoll}`} />
            </div>
          )}
        </div>

        <div className="vs-text">
          {battleStarted ? (
            result === null ? <p className="rolling">🎲 Rolling Dice...</p> :
            result === 'win' ? <p className="result win">🏆 G‘alaba!</p> :
            <p className="result lose">💀 Mag‘lubiyat</p>
          ) : (
            <button onClick={startBattle} className="Battle-btn"> <img src={battle} alt="" /></button>
          )}
        </div>

        <div className="side dragon-side">
          <h2>🐉 Dragon</h2>
          <p>❤️ Health: {dragonStats.health}</p>
          <p>🗡️ Attack: {dragonStats.attack}</p>
          <p>🛡️ Defense: {dragonStats.defense}</p>
          {dragonRoll && (
            <div className="dice">
              <img src={diceImages[dragonRoll]} alt={`Dice ${dragonRoll}`} />
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="after-buttons">
          <button className='zero zero1' onClick={handleRestart}>🔁 Restart Game</button>
          <button className='zero zero2' onClick={handleExit}>🏠 Exit to Home</button>

          {result === 'win' && (
            <button className="S-Button" onClick={() => setShowSaveModal(true)}>💾 Saqlash</button>
          )}
        </div>
      )}

        {showSaveModal && (
          <Save
            playerStats={{
            character,
             ...stats
           }}
            onClose={() => setShowSaveModal(false)}/>
        )}
    </div>
  );
};

export default Final;
