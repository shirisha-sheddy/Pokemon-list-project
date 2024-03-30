// App.js
import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import Login from './components/Login';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <PokemonList onLogout={handleLogout} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Login onLogin={handleLogin} setLoggedIn={setLoggedIn} /> 
      )}
    </div>
  );
}

export default App;
