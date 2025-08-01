// src/utils/playSound.js

// Audio fayllarni cache qilish uchun obyekt
const audioCache = {};

export function playSound(name) {
  if (!audioCache[name]) {
    const audio = new Audio(`/sounds/${name}`);
    audio.preload = "auto"; // Oldindan yuklash
    audio.volume = 0.5;
    audioCache[name] = audio;
  }

  const sound = audioCache[name];
  sound.currentTime = 0; // Har safar boshidan
  sound.play().catch((e) => {
    console.warn('🔇 Tovush o‘ynamadi:', e);
  });
}
