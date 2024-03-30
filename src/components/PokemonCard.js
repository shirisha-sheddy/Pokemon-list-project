import React from 'react';

function PokemonCard({ pokemon, onPokemonSelect }) {
  const handleClick = () => {
    onPokemonSelect(pokemon.name);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default PokemonCard;
