import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import './CharacterSelect.css';
import charactersData from '../../../public/Data/Character.json';
import { playSound } from '../../utils/playSound';

const CharacterSelect = () => {
  const [selected, setSelected] = useState(null);
  const [showInfoId, setShowInfoId] = useState(null);
  const selectCharacter = useGameStore((s) => s.selectCharacter);
  const navigate = useNavigate();

  const handleStart = () => {
    if (selected) {
      selectCharacter(selected);
      navigate('/game');
      playSound('button-305770.mp3');
    }
  };

  const toggleInfo = (id) => {
    setShowInfoId(showInfoId === id ? null : id);
    playSound('button-305770.mp3');
  };

  return (
    <div className="select-container">
      <div className={`card-list ${showInfoId ? 'info-open' : ''}`}>
        {charactersData.map((char) => (
          <div
            key={char.id}
            className={`char-card ${selected === char.id ? 'selected' : ''} ${showInfoId === char.id ? 'blur' : ''}`}
            onClick={() => {
              if (selected !== char.id) {
                playSound('button-305770.mp3');
                setSelected(char.id);
              }
            }}
          >
            <img src={char.image} alt={char.name} />
            <h3 className='CHCHCH'>{char.name}</h3>

            {showInfoId !== char.id && (
              <button
                className="chinfo-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleInfo(char.id);
                }}
              >❗
              </button>
            )}

            {showInfoId === char.id && (
              <div className="char-info">
                <p><strong>HP:</strong> {char.hp}</p>
                <p><strong>ATK:</strong> {char.atk}</p>
                <p><strong>DEF:</strong> {char.def}</p>
                <p><strong>Skill:</strong> {char.skill}</p>
                <p className="desc">{char.description}</p>

                <button
                  className="close-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfoId(null);
                    playSound('button-305770.mp3');
                  }}
                >
                  <ion-icon size="large" name="close-circle-outline"></ion-icon>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="StartBtn" onClick={handleStart} disabled={!selected}>
        🎮 O‘yin boshlansin!
      </button>
    </div>
  );
};

export default CharacterSelect;
