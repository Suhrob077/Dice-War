// src/components/SkillModal.jsx
import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import './SkillModal.css';

const SkillModal = () => {
  const { showSkillChoice, applySkillEffect, applyElfSkill } = useGameStore();

  if (!showSkillChoice) return null;

  if (showSkillChoice === 'elf') {
    return (
      <div className="modal">
        <h3>🧝 Elf skilli: Yo‘nalish va Qadam tanlang</h3>
        <div className="direction-buttons">
          {['forward', 'backward'].map((dir) => (
            <div key={dir}>
              <h4>{dir === 'forward' ? 'Oldinga' : 'Orqaga'}</h4>
              {[1, 2, 3].map((step) => (
                <button key={step} onClick={() => applyElfSkill(dir, step)}>
                  {step} qadam
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Human uchun tanlov oynasi
  return (
    <div className="modal">
      <h3>✨ Human skilli: Kuch tanlang</h3>
      {['attack', 'defense', 'health'].map((type) => (
        <button key={type} onClick={() => applySkillEffect(type)}>
          {type.toUpperCase()} +50
        </button>
      ))}
    </div>
  );
};

export default SkillModal;
