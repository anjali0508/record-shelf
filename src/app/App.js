import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <div>Hello</div>
    </div>
  );
};

export default App;
