// src/components/WeatherDisplay.jsx
import React from 'react';
import { getWeatherIcon } from './WeatherIcons'; // Importe la fonction qui retourne l'icône
import { getCountryName } from '../utils/countryConverter';

function WeatherDisplay({ data }) {
  if (!data) {
    return <p>Veuillez entrer une ville pour obtenir les données météo.</p>;
  }

  // Accès aux propriétés de l'objet de données
  const { name, main, weather, wind, sys } = data;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;
  const weatherId = weather[0].id; // Récupère l'ID pour l'icône
  const country = sys.country;

  return (
    <div className="weather-display">
      <h2>Météo pour {name}, {getCountryName(country)}</h2>
      <div className="weather-icon-container">
        {getWeatherIcon(weatherId)}
      </div>
      <p>Température : {Math.round(temperature)}°C</p>
      <p>Conditions : {description}</p>
      <p>Humidité : {humidity}%</p>
      <p>Vitesse du vent : {Math.round(windSpeed)} m/s</p>
    </div>
  );
}

export default WeatherDisplay;