import React from 'react';
import { Grid } from 'react-virtualized';
import { gridData } from '../utils/gridData.js';

function cellRenderer({ columnIndex, key, rowIndex, style }) {
  return (
    <div key={key} style={style}>
      {gridData[rowIndex].name}
    </div>
  );
}

const VirtualGrid = () => (
  <Grid
    className="ap-grid"
    cellRenderer={cellRenderer}
    columnCount={1}
    columnWidth={150}
    height={300}
    rowCount={gridData.length}
    rowHeight={30}
    width={800}
  />
);

export default VirtualGrid;
