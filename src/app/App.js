import './App.css';
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';

const App = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
};

export default App;
