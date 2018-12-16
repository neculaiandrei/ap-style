import React from 'react';
import { Grid } from 'react-virtualized';
import { flattenGridData } from '../utils/gridData.js';

function collapse(rowIndex) {
  var item = flattenGridData[rowIndex];
  item.expanded = false;

  const startIndex = rowIndex + 1;
  let stopIndex = -1;
  let notFound = true;
  let i = startIndex;

  if (flattenGridData[i].depth === item.depth) {
    GridRef.recomputeGridSize();
    return;
  }
  while (notFound && i < flattenGridData.length) {
    i++;
    if (flattenGridData[i].depth === item.depth) {
      notFound = false;
      stopIndex = i;
    }
  }

  flattenGridData.splice(startIndex, stopIndex - startIndex);
  GridRef.recomputeGridSize();
}

function cellRenderer({ key, rowIndex, style }) {
  const item = flattenGridData[rowIndex];
  return (
    <div key={key} style={style} onClick={_ => collapse(rowIndex)}>
      {`${item.depth} - ${item.expanded} - ${item.name}`}
    </div>
  );
}

var GridRef;
function setRef(ref) {
  GridRef = ref;
}

const VirtualGrid = () => (
  <Grid
    className="ap-grid"
    ref={setRef}
    cellRenderer={cellRenderer}
    columnCount={1}
    columnWidth={200}
    height={300}
    rowCount={flattenGridData.length}
    rowHeight={30}
    width={800}
  />
);

export default VirtualGrid;
