import React from 'react';
import { Grid, defaultCellRangeRenderer } from 'react-virtualized';
import { gridData } from '../utils/gridData.js';

let data = [...gridData];

function collapseRow(event, rowIndex) {
  var item = data[rowIndex];
  var startIndex = rowIndex + 1;
  var stopIndex = -1;
  var i = startIndex;
  var endNotFound = true;

  if (data[startIndex].depth === item.depth) {
    return;
  }

  while (endNotFound) {
    i++;

    if (i === data.length) {
      stopIndex = i;
      endNotFound = false;
      continue;
    }

    if (data[i].depth === item.depth) {
      stopIndex = i;
      endNotFound = false;
    }
  }
  item.expanded = false;
  data.splice(startIndex, stopIndex - startIndex);
  data = [...data];
  event.stopPropagation();
  VirtualGridRef.recomputeGridSize();
  VirtualGridRef.forceUpdate();
}

function cellRangeRenderer(props) {
  const children = defaultCellRangeRenderer(props);
  return children;
}

function cellRenderer({ key, rowIndex, style }) {
  var item = data[rowIndex];

  return (
    <div key={key} style={style} onClick={_ => collapseRow(_, rowIndex)}>
      {`${item.depth}-${item.name}-${item.expanded}`}
    </div>
  );
}

var VirtualGridRef;
function setRef(ref) {
  VirtualGridRef = ref;
}

const VirtualGrid = () => (
  <Grid
    ref={setRef}
    className="ap-grid"
    cellRenderer={cellRenderer}
    cellRangeRenderer={cellRangeRenderer}
    columnCount={1}
    columnWidth={250}
    height={300}
    rowCount={(function() {
      return data.length;
    })()}
    rowHeight={30}
    width={800}
  />
);

export default VirtualGrid;
