import './App.css';
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { AllSongs } from '../containers/AllSongs/AllSongs';

const App = () => (
  <div className="App">
    <Navbar />
    <AllSongs />
  </div>
);

export default App;
