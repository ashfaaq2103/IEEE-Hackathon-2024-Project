import React from 'react';
import './Item.scss';

const Item = ({ imgSrc, text }) => (
  <div className="item">
    <img src={imgSrc} alt=""/>
    <p>{text}</p>
  </div>
);

export default Item;
