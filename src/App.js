import React from 'react';
import Navbar from './Navbar';
import Toolbar from './Toolbar';
import { DumbGrid, VirtualGrid } from './Grid';
import data from './utils/data.js';
import { gridData, gridDataCount } from './utils/gridData';

const App = () => {
  return (
    <div>
      <Toolbar />
      <Navbar {...data} />
      {/* <DumbGrid data={gridData} /> */}
      <VirtualGrid />
      <p>Count: {gridDataCount}</p>
    </div>
  );
};

export default App;
