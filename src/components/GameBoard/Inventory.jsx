import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import './Inventory.css';
import { playSound } from '../../utils/playSound';

const Inventory = ({ onClose }) => {
  const inventory = useGameStore((state) => state.inventory);
  const useItem = useGameStore((state) => state.addItem);
  const movePlayer = useGameStore((state) => state.movePlayer);
  const removeItem = useGameStore((state) => state.setInventory);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDiceInput, setShowDiceInput] = useState(false);
  const [diceValue, setDiceValue] = useState('');

  const handleItemClick = (item) => {
    playSound('interface-124464.mp3'); // Ovoz item tanlanganda
    setSelectedItem(item);
    setShowDiceInput(item.name.toLowerCase().includes('dice'));
  };

  const handleActivate = () => {
    if (!selectedItem) return;

    playSound('interface-124464.mp3'); // Faollashtirishda ovoz

    if (!selectedItem.name.toLowerCase().includes('dice')) {
      useItem(selectedItem);
      const newInventory = inventory.filter((i) => i.name !== selectedItem.name);
      removeItem(newInventory);
      setSelectedItem(null);
      setShowDiceInput(false);
    }
  };

  const handleDiceUse = () => {
    if (!selectedItem) return;

    let max = 6;
    if (selectedItem.name.includes('Super Dice 1️⃣')) max = 20;
    else if (selectedItem.name.includes('Super Dice 2️⃣')) max = 35;
    else if (selectedItem.name.includes('Super Dice 3️⃣')) max = 50;
    else if (selectedItem.name.includes('Black Dice')) max = 6;
    else if (selectedItem.name.includes('Gold Dice')) max = 6;

    const number = parseInt(diceValue);
    if (isNaN(number) || number < 1 || number > max) {
      alert(`⚠️ ${selectedItem.name} uchun 1 dan ${max} gacha raqam kiriting!`);
      return;
    }

    playSound('interface-124464.mp3'); // Yurish tugmasi bosilganda

    if (selectedItem.name.includes('Black Dice')) {
      movePlayer(-number);
    } else {
      movePlayer(number);
    }

    const newInventory = inventory.filter((i) => i.name !== selectedItem.name);
    removeItem(newInventory);
    setSelectedItem(null);
    setShowDiceInput(false);
    setDiceValue('');
  };

  return (
    <div className="inventory">
      <div className='Inventorymenu'>
        <h2>🎒 Inventar</h2>
        <button className='exit-inventor' onClick={()=>{
          playSound('interface-124464.mp3');
          onClose();
          }}>
            Exit
        </button>
      </div>

      <div className="inventory-grid">
        {inventory.map((item, index) => (
          <div
            key={index}
            className={`inventory-item ${selectedItem?.name === item.name ? 'selected' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <img className="Item-images" src={item.image} alt={item.name} />
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="inventory-actions">
          <p className='tanlandi'>Tanlangan: {selectedItem.name}</p>
          {!showDiceInput && (
            <button onClick={handleActivate}>Faollashtirish</button>
          )}
        </div>
      )}

      {showDiceInput && (
        <div className="dice-input">
          <input
            type="number"
            value={diceValue}
            onChange={(e) => setDiceValue(e.target.value)}
            placeholder="Nechiga yurmoqchisiz?"
          />
          <button onClick={handleDiceUse}>🎲 Yurish</button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
