import React from 'react';
import Navbar from './Navbar';
import Toolbar from './Toolbar';
import { DumbGrid, VirtualGrid, VirtualGrid2 } from './Grid';
import data from './utils/data.js';
//import { gridData, gridDataCount } from './utils/gridData';
import { gridData, gridDataCount } from './utils/gridData2';

const App = () => {
  return (
    <div>
      <Toolbar />
      <Navbar {...data} />
      {/* <DumbGrid data={gridData} /> */}
      {/* <VirtualGrid data={gridData} /> */}
      <VirtualGrid2 data={gridData} />
      <p>Initial nodes: {gridDataCount}</p>
    </div>
  );
};

export default App;
