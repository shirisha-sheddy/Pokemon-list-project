import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails';
import Login from './Login'; // Import LoginForm component

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [loggedIn, setLoggedIn] = useState(true); // Initially set to true assuming user is already logged in
  const observer = useRef(null);

  useEffect(() => {
    if (loggedIn) {
      fetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    if (!loading) return;
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (pokemons.length > 0) {
      observer.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      });
      if (observer.current) {
        observer.current.observe(document.querySelector('#end-of-list'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  const fetchPokemons = () => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
        setTotalPokemons(data.count);
        setLoading(false);
        setOffset(prevOffset => prevOffset + 20);
      })
      .catch(error => {
        console.error('Error fetching pokemons:', error);
        setLoading(false);
      });
  };

  const handlePokemonSelect = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setSelectedPokemon(data);
      })
      .catch(error => {
        console.error('Error fetching pokemon details:', error);
      });
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    setLoggedIn(false); // Update state to indicate logout
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && pokemons.length < totalPokemons) {
      setLoading(true);
    }
  };

  return (
    <div>
      {loggedIn ? ( // Render Pokémon list if logged in, otherwise render login form
        <div>
          <nav className="navbar">
            <div className="navbar-left">
              <h1>Pokémon List</h1>
            </div>
            <div className="navbar-right">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
          <div className="pokemon-list">
            {pokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                onPokemonSelect={handlePokemonSelect}
              />
            ))}
            {loading && <div>Loading...</div>}
            {selectedPokemon && (
              <div className="popup">
                <div className="popup-content">
                  <PokemonDetails
                    pokemon={selectedPokemon}
                    onClose={handleClosePopup}
                  />
                </div>
              </div>
            )}
            <div id="end-of-list"></div>
          </div>
        </div>
      ) : (
        <Login /> // Render login form if not logged in
      )}
    </div>
  );
}

export default PokemonList;
