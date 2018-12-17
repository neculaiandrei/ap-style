import React from 'react';
import TreeArrow from './TreeArrow.js';

const TreeNode = ({ item, isHighlighted, onClick, onToggle }) => (
  <div
    className={`cell ${isHighlighted ? 'cell--highlighted' : ''}`}
    style={{ paddingLeft: 20 * item.depth }}
    onClick={onClick}
  >
    <span onClick={onToggle}>
      {item.expanded !== undefined && <TreeArrow expanded={item.expanded} />}
    </span>
    {`${item.depth}-${item.name}`}
  </div>
);

export default TreeNode;
