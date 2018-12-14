import React from 'react';
import Navbar from './Navbar';
import Toolbar from './Toolbar';
import Grid from './Grid';
import data from './utils/data.js';

const App = () => {
  return (
    <div>
      <Toolbar />
      <Navbar {...data} />
      <Grid />
    </div>
  );
};

export default App;
