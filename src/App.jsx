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

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      // Requête pour la météo actuelle
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
      if (!currentWeatherResponse.ok) throw new Error('Ville non trouvée ou erreur de l\'API.');
      const currentData = await currentWeatherResponse.json();
      setWeatherData(currentData);

      // Requête pour les prévisions sur 5 jours
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
      if (!forecastResponse.ok) throw new Error('Prévisions non disponibles pour cette ville.');
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);

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