import React from 'react';

function PokemonDetails({ pokemon, onClose }) {
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <button onClick={onClose} className='close-btn'>Close</button>
    </div>
  );
}

export default PokemonDetails;
