import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import './GameBoard.css';
import Mission from './Mission';
import SkillModal from '../Skill/SkillModal';
import Player from './Player';
import DiceRoller from './DiceRoller';  
import Tile from './Tiles';
import PlayerInfo from './PlayerInfo';
import Inventory from './Inventory';
import Shop from './Shop';
import Menu from './Menu';
import { playSound } from '../../utils/playSound';
import mapTiles from '../../../public/Data/Map Tiles.json';
import charactersData from '../../../public/Data/Character.json';

const TILE_SIZE = 50;
const ROWS = 10;
const COLS = 10;

const getPositionForTile = (index) => {
  const row = Math.floor(index / COLS);
  const colInRow = index % COLS;
  const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
  return {
    top: row * TILE_SIZE,
    left: col * TILE_SIZE,
  };
};

const GameBoard = () => {
  const navigate = useNavigate();
  const {
    position,
    movePlayer,
    applyTileEffect,
    messages,
    character: selectedCharacterId,
    stats,
    goldDiceCooldown,
    setGoldDiceCooldown,
    inventory,
    isGameOver,
    setGameOver,
  } = useGameStore();

  const selectedCharacter = charactersData.find(c => c.id === selectedCharacterId);
  const playerSprite = selectedCharacter?.image || '/assets/player.png';

  const [activePanel, setActivePanel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMission, setShowMission] = useState(false);

  // 💥 HP nolga tushganda o‘yin tugaydi
  useEffect(() => {
    if (stats?.health <= 0 && !isGameOver) {
      setGameOver(true);
    }
  }, [stats?.health, isGameOver]);

  // 🧠 O‘yin tugaganida menyuni ochish
  useEffect(() => {
    if (isGameOver) {
      setMenuOpen(true);
      playSound('dragon-breathing-fire-364475.mp3');
    }
  }, [isGameOver]);

  // 📦 Katakka tushganida effektlar
  useEffect(() => {
    const tile = mapTiles.find(t => t.id === position);
    if (tile) {
      applyTileEffect(tile.type, tile.extra);

      switch (tile.type) {
        case 'coin':
        case 'chest':
          playSound('badge-coin-win-14675.mp3');
          break;
        case 'monster-snacke':
        case 'monster-tree':
          playSound('mouse-click-6-381778.mp3');
          break;
        case 'weapon':
          playSound('sword-slash-with-metallic-impact-185435.mp3');
          break;
        case 'defense':
          playSound('shield-guard-6963.mp3');
          break;
        case 'diamond':
          playSound('correct-356013.mp3');
          break;
        case 'mission':
          playSound('correct-356013.mp3');
          setShowMission(true);
          break;
        default:
          // optional: step sound
          break;
      }
    }

    if (goldDiceCooldown > 0) {
      setGoldDiceCooldown(goldDiceCooldown - 1);
    }
  }, [position]);

  // 🎯 G‘alaba holati (99-katak)
  useEffect(() => {
    if (position === 99) {
      navigate('/final');
      playSound('dragon-breathing-fire-364475.mp3');
    }
  }, [position]);

  const handleDiceRoll = (steps) => {
    movePlayer(steps);
  };

  const togglePanel = (panel) => {
    playSound('button-305770.mp3');
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
    playSound('button-305770.mp3');
  };

  const handleMenuAction = (action) => {
    if (action === 'resume') {
      setMenuOpen(false);
    } else if (action === 'restart') {
      useGameStore.getState().resetGame();
      setMenuOpen(false);
      navigate('/select');
    } else if (action === 'exit') {
      useGameStore.getState().fullResetGame();
      navigate('/');
    }
  };

  return (
    <div className={`game-container ${menuOpen ? 'blurred' : ''}`}>
      <div className="tiles-container">
        <Player position={position} sprite={playerSprite} />
        {Array.from({ length: 100 }, (_, index) => {
          const tile = mapTiles.find(t => t.id === index);
          return (
            <Tile
              key={index}
              index={index}
              type={tile?.type || ''}
              style={getPositionForTile(index)}
            />
          );
        })}
      </div>

      {!menuOpen && (
        <>
          <DiceRoller onRoll={handleDiceRoll} />
          <PlayerInfo />
          <SkillModal />

          {showMission && <Mission onClose={() => setShowMission(false)} />}

          <div className="ui-buttons">
            <button className="menu-btn" onClick={handleMenuClick}>☰ Menu</button>
            <button
              className="shop-btn"
              onClick={() => togglePanel('shop')}
              disabled={inventory.includes('Gold-Dice') || goldDiceCooldown > 0}
            >
              🛒 Shop
            </button>
            <button
              className="inventory-btn"
              onClick={() => togglePanel('inventory')}
            >
              🎒 Inventory
            </button>
          </div>

          {activePanel === 'shop' && (
            <Shop onClose={() => {
              setActivePanel(null);
              playSound('button-305770.mp3');
            }} />
          )}

          {activePanel === 'inventory' && (
            <Inventory onClose={() => {
              setActivePanel(null);
              playSound('button-305770.mp3');
            }} />
          )}

          <div className="message-feed absolute top-4 left-4 space-y-2 z-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="px-3 py-2 rounded-lg shadow bg-black bg-opacity-70 text-sm animate-fade-in-out"
                style={{ color: msg.color }}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </>
      )}

      {menuOpen && <Menu onAction={handleMenuAction} gameOver={isGameOver} />}
    </div>
  );
};

export default GameBoard;
