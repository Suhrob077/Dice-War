import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import shopItems from '../../../public/Data/Shop.json';
import { playSound } from '../../utils/playSound';

import './Shop.css';
import CoinIconSmall from './Icons/coin2.png';
import CoinIconBig from './Icons/coin3.png';

const Shop = ({ onClose }) => {
  const {
    gold,
    extraSkills,
    goldDiceCooldown,
    buyItem,
  } = useGameStore();

  const isItemDisabled = (itemName) => {
    if (itemName === 'Gold-Dice') {
      return extraSkills.includes('Gold-Dice') || goldDiceCooldown > 0;
    }
    if (itemName === 'Max-Hp' || itemName === 'Max HP Eliksiri') {
      return extraSkills.includes('Max HP Eliksiri');
    }
    return false;
  };

  const handlePurchase = (item, disabled) => {
    if (!disabled && gold >= item.price) {
      playSound('coin-recieved-230517.mp3');
      buyItem(item);
    }
  };

  const handleExit = () => {
    playSound('button-305770.mp3');
    onClose?.(); // mavjud bo‘lsa chaqiriladi
  };

  return (
    <div className="shop-panel">
      <div className="Shopping">
        <h2 className="Shop-name">🛒 Do‘kon</h2>
        <p className="gold-info">
          {gold} <img className="CCC" src={CoinIconBig} alt="coin" />
        </p>
        <button onClick={handleExit}>❌ Chiqish</button>
      </div>

      <div className="shop-items">
        {shopItems.map((item) => {
          const disabled = isItemDisabled(item.name);
          return (
            <div
              key={item.id}
              className={`shop-card ${disabled ? 'disabled-card' : ''}`}
            >
              <img src={item.image} alt={item.name} className="shop-img" />
              <div className="shop-details">
                <div className="Shop-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <h3>{item.status}</h3>
                </div>
                <p className="price">
                  {item.price} <img className="CCC" src={CoinIconSmall} alt="coin" />
                </p>
                <button
                  disabled={disabled || gold < item.price}
                  onClick={() => handlePurchase(item, disabled)}
                >
                  Sotib olish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
