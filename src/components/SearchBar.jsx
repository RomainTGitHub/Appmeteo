// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Appel API pour les suggestions de ville
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 0) {
        try {
          const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des suggestions');
          }
          const data = await response.json();

          // Filtrage pour ne garder que les villes uniques
          const uniqueCities = data.filter((city, index, self) =>
            index === self.findIndex((c) => (
              c.name === city.name && c.country === city.country
            ))
          );
          
          setSuggestions(uniqueCities);
        } catch (error) {
          console.error(error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [input, apiKey]);

  const handleSearch = (city) => {
    onSearch(city);
    setSuggestions([]);
  };

  const handleSuggestionClick = (name) => {
    setInput(name);
    handleSearch(name);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Entrez le nom d'une ville..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city.name)}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleSearch(input)}>Rechercher</button>
    </div>
  );
}

export default SearchBar;