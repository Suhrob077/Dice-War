import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CharacterSelect from './components/CharacterSelect/CharacterSelect';
import GameBoard from './components/GameBoard/GameBoard';
import Final from './components/Final/Final';
import Prank from './components/Global-Rank/PRank';
import About from './components/Home/Abought';
import './App.css';

const App = () => {
  const [isLandscape, setIsLandscape] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);

  const checkOrientation = () => {
    const landscape = window.matchMedia("(orientation: landscape)").matches;
    setIsLandscape(landscape);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    const timer = setTimeout(() => setAnimationFinished(true), 3000); // 3s animatsiya

    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
      clearTimeout(timer);
    };
  }, []);

  if (!animationFinished) {
    return (
      <div className="animation-screen">
        <h1 className="fade-in">🎲 Dice - War ⚔</h1>
      </div>
    );
  }

  if (!isLandscape) {
    return (
      <div className="rotate-warning">
        <h2>📱 Iltimos, telefoningizni gorizontal holatga o‘tkazing!</h2>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<CharacterSelect />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/final" element={<Final />} />
        <Route path="/top-player" element={<Prank />} />
        <Route path="/abought" element={<About/>}/>
      </Routes>
    </Router>
  );
};

export default App;
