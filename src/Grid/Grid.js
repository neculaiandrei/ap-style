import React from 'react';
import { Grid } from 'react-virtualized';

const list = [
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125]
];

function cellRenderer({ columnIndex, key, rowIndex, style, isVisible }) {
  return (
    <div key={key} style={style}>
      {list[rowIndex][columnIndex]}
    </div>
  );
}

const MyGrid = () => (
  <Grid
    className="ap-grid"
    cellRenderer={cellRenderer}
    columnCount={list[0].length}
    columnWidth={150}
    height={300}
    rowCount={list.length}
    rowHeight={30}
    width={800}
  />
);

export default MyGrid;
