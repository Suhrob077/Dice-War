import React, { useEffect, useState, useMemo } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/playSound';
import './Mission.css';

const Mission = ({ onClose }) => {
  const [mission, setMission] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const addGold = useGameStore(state => state.addGold);
  const stats = useGameStore(state => state.stats);
  const addMessage = useGameStore(state => state.addMessage);

  useEffect(() => {
    const loadMission = async () => {
      try {
        const res = await fetch('../../../public/Data/MIssions.json');
        const data = await res.json();
        const randomMission = data[Math.floor(Math.random() * data.length)];
        setMission(randomMission);
      } catch (err) {
        console.error('Missiya yuklanmadi:', err);
      }
    };
    loadMission();
  }, []);

  const options = useMemo(() => {
    if (!mission) return [];
    return [mission.javob, mission.false1, mission.false2].sort(() => Math.random() - 0.5);
  }, [mission]);

  const handleAnswer = (value) => {
    if (!mission || selected !== null) return;

    playSound('button-305770.mp3'); // ✅ Tovush tugma bosilganda

    const isCorrect = value === mission.javob;
    setSelected(value);
    setResult(isCorrect);

    const { amount, type } = mission.reward;

    if (isCorrect) {
      if (type === 'coin') {
        addGold(amount);
      } else {
        const updatedStats = { ...stats };
        updatedStats[type] = (updatedStats[type] || 0) + amount;
        useGameStore.setState({ stats: updatedStats });
      }
      addMessage('✅ Missiya bajarildi!', 'green');
    } else {
      if (type === 'coin') {
        addGold(-amount);
      } else {
        const updatedStats = { ...stats };
        updatedStats[type] = Math.max(0, (updatedStats[type] || 0) - amount);
        useGameStore.setState({ stats: updatedStats });
      }
      addMessage('❌ Xato! Yutuq yo‘qotildi.', 'red');
    }

    setTimeout(onClose, 1000);
  };

  if (!mission) return null;

  return (
    <div className="mission-overlay">
      <div className="mission-box">
        <button
          className="mission-infobtn"
          onClick={() => {
            playSound('button-305770.mp3'); // ✅ Info tugmasi uchun tovush
            setShowInfo(!showInfo);
          }}
        >
          ℹ️ Missiya haqida
        </button>

        <h2>📜 Missiya</h2>
        <p className="expression">{mission.misol}</p>

        <div className="reward-info">
          🎁 Yutuq: <strong>{mission.reward.amount} {mission.reward.type}</strong>
        </div>

        <div className="options">
          {options.map((opt) => (
            <button
              key={opt}
              className={`option-btn ${selected === opt ? (result ? 'correct' : 'wrong') : ''}`}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected && (
          <p className="result-text">
            {result ? '✅ To‘g‘ri!' : `❌ Noto‘g‘ri. To‘g‘ri javob: ${mission.javob}`}
          </p>
        )}

        {showInfo && (
          <div className="mission-info-box">
            <p>
              Misolni to‘g‘ri ishlang. Agar to‘g‘ri javob bersangiz — yutuq olasiz. 
              Aks holda, sizning <strong>{mission.reward.type}</strong> darajangizdan 
              <strong> {mission.reward.amount}</strong> kamayadi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mission;
