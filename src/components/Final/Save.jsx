// src/components/Save.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
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
      setMessage('❌ Saqlashda xatolik!');
    } else {
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
      console.error("❌ Supabase Error (CHECK):", error);
      setMessage('❌ Foydalanuvchini tekshirishda xatolik - iltimos aloqani tekshiring!');
      return;
    }

    if (!data) {
      setMessage('❌ Bu foydalanuvchi topilmadi!');
    } else if (data.password !== password) {
      setMessage('❌ Noto‘g‘ri parol!');
    } else {
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
      console.error("❌ Supabase Error (UPDATE):", error);
      setMessage('❌ Internetngizni tekshiring!');
    } else {
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
          <button onClick={() => setMode('save')}>🆕 Yangi saqlash</button>
          <button onClick={() => setMode('update')}>🔄 Yangilash</button>
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
            <p className="message error-msg">❌ Telegram manzili noto‘g‘ri! Masalan: @username</p>
          )}

          {mode === 'save' && (
            <button
              onClick={handleSave}
              disabled={!inputsAreValid}
              className={!inputsAreValid ? 'disabled' : ''}
            >
              💾 Saqlash
            </button>
          )}

          {mode === 'update' && !showUpdateButton && (
            <button
              onClick={handleCheckAndEnableUpdate}
              disabled={!inputsAreValid}
              className={!inputsAreValid ? 'disabled' : ''}
            >
              🔍 Tekshirish
            </button>
          )}

          {mode === 'update' && showUpdateButton && (
            <button onClick={handleUpdate}>✅ Yangilash</button>
          )}

          <button onClick={resetForm}>❌ Bekor qilish</button>

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Save;
