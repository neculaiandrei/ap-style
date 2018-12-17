import React from 'react';

const TimelineRow = ({ item, isHighlighted }) => (
  <div className={`cell ${isHighlighted ? 'cell--highlighted' : ''}`}>
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: `${item.width}%`,
        left: `${item.left}%`,
        border: '3px black solid'
      }}
    />
  </div>
);

export default TimelineRow;
