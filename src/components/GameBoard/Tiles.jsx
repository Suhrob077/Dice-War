import React from 'react';
import './Tiles.css';
import start from './Icons/Start.png'
import Boss from './Icons/dragon.jpg'
import MS from './Icons/snacke.png'
import MT from './Icons/tree-monster.png'
import coin from './Icons/coin.png'
import teleport from './Icons/teleport.png'
import sword from './Icons/sword.png'
import shield from './Icons/Shield.png'
import CHEST from './Icons/CHest.png'
import Diamond from './Icons/diamond.png'
import Fire from './Icons/fire.png'
import Mission from './Icons/mission.png'



const Tile = ({ index, type, style }) => {
  const getTileContent = () => {
    switch (type) {
      case 'start': return <img className='imgs-T' src={start} alt="" />;
      case 'coin': return <img className='imgs-T' src={coin} alt="" />;
      case 'chest': return <img className='imgs-T' src={CHEST} alt="" />;
      case 'monster-tree': return <img className='imgs-T' src={MT} alt="" />;
      case 'monster-snacke': return <img className='imgs-T' src={MS} alt="" />;
      case 'weapon': return <img className='imgs-T' src={sword} alt="" />;
      case 'defense': return <img className='imgs-T' src={shield} alt="" />;
      case 'boss': return <img className='imgs-T' src={Boss} alt="" />;
      case 'teleport': return <img className='imgs-T' src={teleport} alt="" />;
      case 'diamond' : return <img className='imgs-T' src={Diamond} alt="" />;
      case 'blackhole': return '⚫';
      case 'fire': return <img className='imgs-T' src={Fire} alt="" />;
      case 'mission': return <img className='imgs-T' src={Mission} alt="" />;
      default: return '';
    }
  };

  return (
    <div className={`tile ${type || 'empty'}`} style={style}>
      <span className="tile-content">{getTileContent()}</span>
      <span className="tile-index">{index}</span>
    </div>
  );
};

export default Tile;
