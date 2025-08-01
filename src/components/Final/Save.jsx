// src/components/Save.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { playSound } from '../../utils/playSound';
import './Save.css';

const Save = ({ playerStats }) => {
  const [mode, setMode] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telegram, setTelegram] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const isTelegramValid = telegram.trim() === '' || /^@[a-zA-Z0-9_]{5,32}$/.test(telegram);
  const inputsAreValid = username.trim() !== '' && password.trim() !== '' && isTelegramValid;

  const togglePasswordVisibility = () => {
    playSound('interface-124464.mp3');
    setShowPassword(!showPassword);
  };

  const handleSave = async () => {
    if (!inputsAreValid) return;

    const { data: existingUser, error: checkError } = await supabase
      .from('players')
      .select('username')
      .eq('username', username)
      .single();

    if (checkError) {
      console.error("🔍 Tekshiruvda xatolik:", checkError);
    }

    if (existingUser) {
      playSound('mouse-click-6-381778.mp3');
      setMessage('❌ Bu ism allaqachon mavjud!');
      return;
    }

    const { error } = await supabase.from('players').insert([{
      username,
      password,
      telegram,
      character: playerStats.character,
      health: playerStats.health,
      attack: playerStats.attack,
      defense: playerStats.defense,
    }]);

    if (error) {
      console.error("📦 playerStats:", playerStats);
      console.error("❌ Supabase Error (INSERT):", error);
      playSound('mouse-click-6-381778.mp3');
      setMessage('❌ Saqlashda xatolik!');
    } else {
      playSound('correct-356013.mp3');
      alert('✅ Maʼlumot muvaffaqiyatli saqlandi!');
      setMessage('✅ Saqlandi!');
      resetForm();
    }
  };

  const handleCheckAndEnableUpdate = async () => {
    if (!inputsAreValid) return;

    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      playSound('mouse-click-6-381778.mp3');
      console.error("❌ Supabase Error (CHECK):", error);
      setMessage('❌ Foydalanuvchini tekshirishda xatolik - iltimos aloqani tekshiring!');
      return;
    }

    if (!data) {
      playSound('mouse-click-6-381778.mp3');
      setMessage('❌ Bu foydalanuvchi topilmadi!');
    } else if (data.password !== password) {
      playSound('mouse-click-6-381778.mp3');
      setMessage('❌ Noto‘g‘ri parol!');
    } else {
      playSound('correct-356013.mp3');
      setShowUpdateButton(true);
      setMessage('✅ Tekshiruv o‘tildi, yangilash mumkin!');
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('players')
      .update({
        character: playerStats.character,
        health: playerStats.health,
        attack: playerStats.attack,
        defense: playerStats.defense,
        telegram,
      })
      .eq('username', username);

    if (error) {
      playSound('mouse-click-6-381778.mp3');
      console.error("❌ Supabase Error (UPDATE):", error);
      setMessage('❌ Internetngizni tekshiring!');
    } else {
      playSound('correct-356013.mp3');
      alert('✅ Yangilash muvaffaqiyatli amalga oshirildi!');
      setMessage('✅ Maʼlumotlar yangilandi!');
      resetForm();
    }
  };

  const resetForm = () => {
    setMode(null);
    setUsername('');
    setPassword('');
    setTelegram('');
    setMessage('');
    setShowUpdateButton(false);
    setShowPassword(false);
  };

  return (
    <div className="save-panel">
      {!mode && (
        <div className="save-buttons">
          <button onClick={() => { playSound('click'); setMode('save'); }}>🆕 Yangi saqlash</button>
          <button onClick={() => { playSound('click'); setMode('update'); }}>🔄 Yangilash</button>
        </div>
      )}

      {mode && (
        <div className="save-form">
          <input
            type="text"
            placeholder="Ism kiriting"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Parol kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-icon" onClick={togglePasswordVisibility}>
              <ion-icon name={showPassword ? "eye-off-outline" : "eye-outline"}></ion-icon>
            </span>
          </div>

          <input
            type="text"
            placeholder="Telegram manzilingiz (masalan: @nickname)"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
          {telegram && !isTelegramValid && (
            <p className="message error-msg">❌ @-bilan boshlanagan (4) dan yuqori harfdan iborat bulsin!</p>
          )}

          {mode === 'save' && (
            <button
              onClick={() => { playSound('click'); handleSave(); }}
              disabled={!inputsAreValid}
              className={!inputsAreValid ? 'disabled' : ''}
            >
              💾 Saqlash
            </button>
          )}

          {mode === 'update' && !showUpdateButton && (
            <button
              onClick={() => { playSound('click'); handleCheckAndEnableUpdate(); }}
              disabled={!inputsAreValid}
              className={!inputsAreValid ? 'disabled' : ''}
            >
              🔍 Tekshirish
            </button>
          )}

          {mode === 'update' && showUpdateButton && (
            <button onClick={() => { playSound('click'); handleUpdate(); }}>
              ✅ Yangilash
            </button>
          )}

          <button onClick={() => { playSound('click'); resetForm(); }}>❌ Bekor qilish</button>

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Save;
