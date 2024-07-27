// src/components/Item.js
import React from 'react';
import '../styles/Item.scss'; // Import specific styles

const Item = ({ type }) => (
  <input type="checkbox" className={`object ${type}`} />
);

export default Item;
