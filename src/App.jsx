// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/main.scss';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/donnees?city=${city}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données.');
      }
      const data = await response.json();
      
      setWeatherData(data.weather);
      setForecastData(data.forecast);

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="app-container">
      <header>
        <h1>Application Météo</h1>
      </header>
      <main>
        <SearchBar onSearch={setCity} />
        {loading && <p>Chargement en cours...</p>}
        {error && <p className="error">{error}</p>}
        <div className="weather-and-forecast-container">
          {!loading && !error && weatherData && <WeatherDisplay data={weatherData} />}
          {!loading && !error && forecastData && <ForecastDisplay data={forecastData} />}
        </div>
      </main>
    </div>
  );
}

export default App;