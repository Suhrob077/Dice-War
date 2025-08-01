// ✅ TO‘LIQ YANGILANGAN useGameStore.js
import { create } from 'zustand';

const initialStats = {
  human: { health: 100, attack: 20, defense: 35 },
  elf: { health: 110, attack: 15, defense: 20 },
  orc: { health: 120, attack: 25, defense: 30 },
  sotuvchi: { health: 100, attack: 40, defense: 20 },
};

let messageIdCounter = 0;

export const useGameStore = create((set, get) => ({
  playerName: '',
  character: null,
  stats: null,
  position: 0,
  gold: 0,
  inventory: [],
  skillCooldown: 10,
  isSkillReady: false,
  defeatedDragon: false,
  messages: [],
  extraSkills: [],
  goldDiceCooldown: 0,
  isGameOver: false,
  isMenuOpen: false,
  showSkillChoice: false,

  setPlayerName: (name) => set({ playerName: name }),
  setInventory: (inventory) => set({ inventory }),

  buyItem: (item) => {
    set((state) => {
      if (state.gold < item.price) {
        get().addMessage('❌ Yetarli tanga yo‘q!', 'red');
        return {}; // hech nima o‘zgartirilmaydi
      }
  
      return {
        gold: state.gold - item.price,
        inventory: [...state.inventory, item],
      };
    });
    get().addMessage(`🛒 ${item.name} sotib olindi!`, 'green');
  },

  selectCharacter: (charId) =>
    set({
      character: charId,
      stats: { ...initialStats[charId] },
      skillCooldown: 10,
      isSkillReady: false,
      inventory: [],
      extraSkills: [],
      goldDiceCooldown: 0,
      isGameOver: false,
      position: 0,
      gold: 0,
      showSkillChoice: false,
    }),

  movePlayer: (steps) => {
    const state = get();
    const newPos = Math.min(Math.max(0, state.position + steps), 99);
    const newCooldown = state.skillCooldown - 1;
    const newGoldDiceCooldown = Math.max(0, state.goldDiceCooldown - 1);

    if (state.inventory.find((item) => item.name === 'Tuzalish')) {
      get().healPlayer(10);
    }

    set({
      position: newPos,
      skillCooldown: newCooldown,
      isSkillReady: newCooldown <= 0,
      goldDiceCooldown: newGoldDiceCooldown,
    });

    get().addMessage(`🚶‍♂️ ${steps} qadam yurildi → ${newPos}-katak!`, 'white');

    if (newPos === 99) {
      get().dragonBattle();
    }
  },

  resetSkillCooldown: () => {
    const { character } = get();
  
    if (character === 'human') {
      set({ showSkillChoice: 'human' });
    } else if (character === 'elf') {
      set({ showSkillChoice: 'elf' });
    } else if (character === 'orc') {
      const input = prompt('⚔️ 1 dan 12 gacha raqam kiriting:');
      const steps = parseInt(input);
      if (!input || isNaN(steps) || steps < 1 || steps > 12) {
        get().addMessage('❌ Noto‘g‘ri kiritildi!', 'red');
        return;
      }
      get().movePlayer(steps);
      get().addMessage(`💥 Orc skill: ${steps} katakka oldinga yurdi!`, 'green');
    } else if (character === 'sotuvchi') {
      get().addGold(60);
      get().addMessage('🪙 Sotuvchi skill: +60 tanga olindi!', 'yellow');
    }
  
    set({ skillCooldown: 10, isSkillReady: false });
  },
  
  
  applyElfSkill: (direction, steps) => {
    const state = get();
    const move = steps * (direction === 'forward' ? 1 : -1);
    const newPos = Math.max(0, Math.min(99, state.position + move));

    set({ position: newPos, showSkillChoice: false });
    get().addMessage(`🧝 Elf skill: ${direction === 'forward' ? 'Oldinga' : 'Orqaga'} ${steps} qadam → ${newPos}-katak`, 'green');
    set({ skillCooldown: 10, isSkillReady: false });
  },

  applySkillEffect: (type) => {
    const state = get();
    const stats = { ...state.stats };
    if (type === 'attack') stats.attack += 50;
    else if (type === 'defense') stats.defense += 50;
    else if (type === 'health') stats.health += 50;
    set({ stats, showSkillChoice: false });
    get().addMessage(`✨ ${type.toUpperCase()} +50 qo‘shildi!`, 'green');
  },

  addGold: (amount) => {
    set((state) => ({ gold: state.gold + amount }));
    const msg = amount > 0 ? `🪙 +${amount} tanga olindi!` : `💸 ${Math.abs(amount)} tanga ketdi!`;
    get().addMessage(msg, amount > 0 ? 'green' : 'red');
  },

  addItem: (itemObj) => {
    const state = get();
    const stats = { ...state.stats };
    const inventory = [...state.inventory];
    const extraSkills = [...state.extraSkills];
    const itemName = itemObj.name;

    if (itemName === 'Shield') stats.defense += 20;
    else if (itemName === 'Oltin-Qalqon') stats.defense += 120;
    else if (itemName === 'Sword') stats.attack += 20;
    else if (itemName === 'Olmos-Qilich') stats.attack += 150;
    else if (itemName === 'Tuzalish') stats.health += 40;
    else if (itemName === 'Start-0') set({ position: 0 });
    else if (itemName === 'Gold Dice') {
      if (state.goldDiceCooldown === 0) {
        extraSkills.push('Gold Dice');
        set({ goldDiceCooldown: 10 });
      } else {
        get().addMessage('🕐 Gold Dice hali tayyor emas!', 'gray');
        return;
      }
    } else if (itemName.startsWith('Super Dice')) {
      const max = itemName === 'Super Dice 1️⃣' ? 20 : itemName === 'Super Dice 2️⃣' ? 35 : 50;
      const promptValue = prompt(`🎲 1–${max} oralig‘ida raqam kiriting:`);
      const steps = parseInt(promptValue);
      if (isNaN(steps) || steps < 1 || steps > max) {
        get().addMessage(`❌ 1–${max} oralig‘ida raqam kiriting!`, 'red');
        return;
      }
      get().movePlayer(steps);
    } else if (itemName === 'Black Dice 🕳️') {
      const promptValue = prompt('⬅️ 1 dan 6 gacha raqam kiriting:');
      const steps = parseInt(promptValue);
      if (isNaN(steps) || steps < 1 || steps > 6) {
        get().addMessage('❌ 1–6 oralig‘ida raqam kiriting!', 'red');
        return;
      }
      get().movePlayer(-steps);
    }

    inventory.push(itemObj);
    set({ stats, inventory, extraSkills });
    get().addMessage(`🎒 ${itemName} qo‘shildi!`, 'blue');
  },

  
  takeDamage: (amount) => {
    const state = get();
    const stats = { ...state.stats };
    const inventory = [...state.inventory];
    const leftover = amount - stats.defense;
    stats.defense = Math.max(0, stats.defense - amount);
    stats.health = leftover > 0 ? Math.max(0, stats.health - leftover) : stats.health;
    if (stats.defense === 0) {
      ['Shield', 'Oltin-Qalqon'].forEach((name) => {
        const i = inventory.findIndex((item) => item.name === name);
        if (i !== -1) inventory.splice(i, 1);
      });
    }
    set({ stats, inventory });
    if (stats.health <= 0) {
      set({ isGameOver: true });
      get().addMessage('☠️ Siz mag‘lub bo‘ldingiz!', 'red');
    } else {
      get().addMessage(`💥 ${amount} zarar olindi!`, 'red');
    }
  },

  healPlayer: (amount) => {
    const state = get();
    const max = initialStats[state.character].health;
    const healed = Math.min(state.stats.health + amount, max);
    set({ stats: { ...state.stats, health: healed } });
    get().addMessage(`❤️ +${amount} jon to‘ldi!`, 'green');
  },

  defeatDragon: () => set({ defeatedDragon: true }),

  dragonBattle: () => {
    const stats = { ...get().stats };
    const dragon = { health: 200, attack: 350, defense: 250 };
    const damageToDragon = Math.max(0, stats.attack - dragon.defense);
    const damageToPlayer = Math.max(0, dragon.attack - stats.defense);
    const newPlayerHealth = stats.health - damageToPlayer;
    stats.health = Math.max(0, newPlayerHealth);
    if (damageToDragon >= dragon.health && newPlayerHealth > 0) {
      set({ stats, defeatedDragon: true });
      get().addMessage('🐉 Ajdarho mag‘lub bo‘ldi! G‘alaba!', 'gold');
    } else if (newPlayerHealth <= 0) {
      set({ stats, isGameOver: true });
      get().addMessage('☠️ Ajdarho sizni mag‘lub etdi...', 'red');
    } else {
      set({ stats });
      get().addMessage('⚔️ Ajdarho bilan jang bo‘ldi! Yana urinish kerak!', 'orange');
    }
  },

  useGoldDice: (amount) => {
    get().movePlayer(amount);
    get().addMessage(`🎲 Gold-Dice ishlatildi: ${amount} katakka yurildi!`, 'gold');
    set((state) => ({
      extraSkills: state.extraSkills.filter((s) => s !== 'Gold-Dice'),
      inventory: state.inventory.filter((item) => item.name !== 'Gold-Dice'),
    }));
  },

  applyTileEffect: (type, extra) => {
    switch (type) {
      case 'teleport':
        set({ position: extra || 0 });
        get().addMessage(`⚡ Teleport: ${extra}-katakka!`, 'yellow');
        break;
      case 'blackhole':
        set({ position: 0 });
        get().addMessage('🕳️ Qora tuynuk! Startga qaytdinggiz!', 'gray');
        break;
      case 'fire': get().takeDamage(10); break;
      case 'monster-snacke': get().takeDamage(20); break;
      case 'monster-tree': get().takeDamage(35); break;
      case 'coin': get().addGold(15); break;
      case 'chest': get().addGold(60); break;
      case 'diamond': get().addGold(200); break;
      case 'weapon':
        set((state) => ({ stats: { ...state.stats, attack: state.stats.attack + 10 } }));
        get().addMessage('🗡️ Qilich topildi: +10 ataka!', 'purple');
        break;
      case 'defense':
        set((state) => ({ stats: { ...state.stats, defense: state.stats.defense + 10 } }));
        get().addMessage('🛡️ Qalqon topildi: +10 himoya!', 'blue');
        break;
      case 'mission':
        get().addMessage('📜 Missiya boshlangan!', 'gold');
        break;
      default: break;
    }
  },

  addMessage: (text, color = 'white') => {
    const id = messageIdCounter++;
    set((state) => ({ messages: [...state.messages, { id, text, color }] }));
    setTimeout(() => {
      set((state) => ({ messages: state.messages.filter((msg) => msg.id !== id) }));
    }, 5000);
  },

  resetGame: () => {
    const state = get();
    const charId = state.character;
    const baseStats = { ...initialStats[charId] };
  
    set({
      playerName: state.playerName,
      character: charId,
      stats: baseStats,
      position: 0,
      gold: 0,
      inventory: [],
      skillCooldown: 10,
      isSkillReady: false,
      defeatedDragon: false,
      messages: [],
      extraSkills: [],
      goldDiceCooldown: 0,
      isGameOver: false,
      isMenuOpen: false,
      showSkillChoice: false,
    });
  },
  

  fullResetGame: () => set({
    playerName: '',
    character: null,
    stats: null,
    position: 0,
    gold: 0,
    inventory: [],
    skillCooldown: 10,
    isSkillReady: false,
    defeatedDragon: false,
    messages: [],
    extraSkills: [],
    goldDiceCooldown: 0,
    isGameOver: false,
    isMenuOpen: false,
    showSkillChoice: false,
  }),

  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
}));  