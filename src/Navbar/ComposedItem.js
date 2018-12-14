import React from 'react';

const ComposedItem = ({ items, value, onSelect }) => (
  <div className="item item-composed">
    {items.map((item, i) => (
      <div
        key={i}
        className={`sub-item ${item === value ? 'sub-item--selected' : ''}`}
        onClick={_ => onSelect(item)}
      >
        {item.label}
      </div>
    ))}
  </div>
);

export default ComposedItem;
