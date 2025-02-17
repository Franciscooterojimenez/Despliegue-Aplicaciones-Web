import React, { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 151) + 1; // ID aleatorio (1-151)
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        type: data.types.map((t) => t.type.name).join(", "),
      });
    } catch (error) {
      console.error("Error al obtener el Pokémon:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pokémon Aleatorio</h1>
      <button onClick={fetchPokemon} disabled={loading}>
        {loading ? "Cargando..." : "Obtener Pokémon"}
      </button>
      {pokemon && (
        <div style={{ marginTop: "20px" }}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.image} alt={pokemon.name} style={{ width: "150px" }} />
          <p><strong>Tipo:</strong> {pokemon.type}</p>
        </div>
      )}
    </div>
  );
}

export default App;
