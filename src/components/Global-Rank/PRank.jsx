import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Prank.css';
import bar1 from './Decorations/Gold.png';
import bar2 from './Decorations/Silver.png';
import bar3 from './Decorations/Bronze.png';
import logo1 from './Decorations/Gold1.png';
import logo2 from './Decorations/silver1.png';
import logo3 from './Decorations/Bronze1.png';
import top1 from './Decorations/top1.png';
import top2 from './Decorations/top2.png';
import top3 from './Decorations/top3.png';
import backgroundMusic from '../../../public/sounds/ambient-soundscapes-004-space-atmosphere-303243.mp3'; // ⬅️ Musiqa faylini import qilamiz

const Prank = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [searchMode, setSearchMode] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchPassword, setSearchPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();
  const audioRef = useRef(null); // 🎵 Audio saqlovchi

  const fetchAndSortPlayers = async () => {
    const { data, error } = await supabase
      .from('players')
      .select('id, username, password, health, attack, defense');

    if (!error) {
      const ranked = data.map((p) => ({
        ...p,
        powerScore: p.health + p.attack * 2 + p.defense * 1.5,
      }));
      ranked.sort((a, b) => b.powerScore - a.powerScore);
      const top10 = ranked.slice(0, 10);
      setPlayers(top10);

      const stillExists = top10.find((p) => p.id === selectedPlayer?.id);
      setSelectedPlayer(stillExists || top10[0]);
    }
  };

  const menuOpen = () => {
    navigate('/');
  };

  useEffect(() => {
    // 🎵 Musiqa boshlanishi
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(err => {
      console.warn("Audio autoplay blocked:", err);
    });

    fetchAndSortPlayers();

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          fetchAndSortPlayers();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      // 🎵 Musiqa to‘xtatish va reset
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(interval);
    };
  }, []);

  const getRankIcon = (index) => [logo1, logo2, logo3][index] || null;
  const getBarIcon = (index) => [bar1, bar2, bar3][index] || null;
  const getTopImage = (index) => [top1, top2, top3][index] || null;

  const handleSearch = () => {
    setSearchError('');
    supabase
      .from('players')
      .select('username, password, health, attack, defense')
      .then(({ data }) => {
        const found = data.find(p => p.username === searchName);
        if (!found) {
          setSearchError('❌ O‘yinchi topilmadi!');
        } else if (found.password !== searchPassword) {
          setSearchError('❌ Parol noto‘g‘ri!');
        } else {
          const powerScore = found.health + found.attack * 2 + found.defense * 1.5;
          const rankedAll = data
            .map(p => ({
              ...p,
              powerScore: p.health + p.attack * 2 + p.defense * 1.5
            }))
            .sort((a, b) => b.powerScore - a.powerScore);
          const rank = rankedAll.findIndex(p => p.username === searchName) + 1;

          setSearchResult({ ...found, powerScore, rank });
          setSearchMode(false);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="prank-container">
      <div className="player-list">
        <div className="countdown-timer">
          ⏳ Ma'lumotlar {countdown} soniyadan so‘ng yangilanadi
        </div>

        {players.map((player, index) => (
          <div
            key={player.id}
            className={`player-row ${selectedPlayer?.id === player.id ? 'active' : ''}`}
            onClick={() => setSelectedPlayer(player)}
          >
            {getBarIcon(index) && (
              <img src={getBarIcon(index)} className="bar-icon" alt="rank-bar" />
            )}
            {index > 2 && <span className="rank-number">#{index + 1}</span>}
            <span className="player-name">{player.username}</span>
            {getRankIcon(index) && (
              <img src={getRankIcon(index)} className="rank-icon" alt="rank-icon" />
            )}
          </div>
        ))}

        <div className="search-section">
          <button className='exitMEnu' onClick={menuOpen}>Chiqish</button>
          {!searchResult && (
            <button onClick={() => setSearchMode(!searchMode)} className="search-btn">
              🔍 O‘zingizni topish
            </button>
          )}
          {searchMode && (
            <div className="search-form">
              <input
                type="text"
                placeholder="Ismingiz..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Parolingiz..."
                  value={searchPassword}
                  onChange={(e) => setSearchPassword(e.target.value)}
                />
                <span className="toggle-icon" onClick={togglePasswordVisibility}>
                  <ion-icon name={showPassword ? "eye-off-outline" : "eye-outline"}></ion-icon>
                </span>
              </div>
              <button onClick={handleSearch}>Qidirish</button>
              {searchError && <div className="error-msg">{searchError}</div>}
            </div>
          )}
        </div>
      </div>
      <div className="player-details">
        {(selectedPlayer || searchResult) && (
          <div className={`details-card`}>
            {getTopImage(players.indexOf(selectedPlayer)) && !searchResult && (
              <img className='top-img' src={getTopImage(players.indexOf(selectedPlayer))} alt="" />
            )}
            <h2 className='PR-Name'>
              {(searchResult || selectedPlayer).username}
            </h2>
            <div className='Trio'>
              <p className='PR-Hp'>❤️ Health: {(searchResult || selectedPlayer).health}</p>
              <p className='PR-Def'>🛡️ Defense: {(searchResult || selectedPlayer).defense}</p>
              <p className='PR-Attack'>🗡️ Attack: {(searchResult || selectedPlayer).attack}</p>
            </div>
            {getRankIcon(players.indexOf(selectedPlayer)) && !searchResult && (
              <img className='noneimg' src={getRankIcon(players.indexOf(selectedPlayer))} alt="" />
            )}
            <div className='PowerUlta'>
              {getBarIcon(players.indexOf(selectedPlayer)) && !searchResult && (
                <img className='bar-imgs' src={getBarIcon(players.indexOf(selectedPlayer))} alt="" />
              )}
              <p className='PR-Power'>{Math.round((searchResult || selectedPlayer).powerScore)}</p>
              {searchResult && <p className='PR-Rank'>🏅 Urningiz: #{searchResult.rank}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prank;
