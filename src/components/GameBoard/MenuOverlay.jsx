// src/components/Game/MenuOverlay.jsx
import React from 'react';
import Menu from './Menu';

const MenuOverlay = ({ onAction }) => {
  return <Menu onAction={onAction} />;
};

export default MenuOverlay;
