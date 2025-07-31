// src/utils/playSound.js
export function playSound(name) {
    const audio = new Audio(`/sounds/${name}`);
    audio.volume = 0.5; // tovush balandligini sozlash
    audio.play().catch((e) => {
      console.warn('🔇 Tovush o‘ynamadi:', e);
    });
  }
  