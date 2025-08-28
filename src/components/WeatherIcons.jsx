// src/components/WeatherIcons.jsx
import React from 'react';
import { FaCloud, FaSun, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from 'react-icons/fa';

/**
 * Fonction qui retourne l'icône React appropriée
 * en fonction de l'ID de la condition météo d'OpenWeatherMap.
 *
 * @param {number} weatherId L'ID de la condition météo.
 * @returns {JSX.Element|null} L'icône correspondante ou null.
 */
export const getWeatherIcon = (weatherId) => {
  // Codes d'OpenWeatherMap : https://openweathermap.org/weather-conditions#Weather-condition-codes-2
  if (weatherId >= 200 && weatherId < 300) {
    return <FaBolt className="icon-bolt" />; // Orage
  } else if (weatherId >= 300 && weatherId < 400) {
    return <FaCloudRain className="icon-drizzle" />; // Bruine
  } else if (weatherId >= 500 && weatherId < 600) {
    return <FaCloudRain className="icon-rain" />; // Pluie
  } else if (weatherId >= 600 && weatherId < 700) {
    return <FaSnowflake className="icon-snow" />; // Neige
  } else if (weatherId >= 700 && weatherId < 800) {
    return <FaSmog className="icon-atmosphere" />; // Atmosphère (brouillard, fumée, etc.)
  } else if (weatherId === 800) {
    return <FaSun className="icon-sun" />; // Ciel clair
  } else if (weatherId > 800 && weatherId < 804) { // Nuages partiels à dispersés
    return <FaCloud className="icon-cloud-partial" />;
  } else if (weatherId === 804) { // Nuages très couverts
    return <FaCloud className="icon-cloud-overcast" />;
  } else {
    return null; // Retourne null si aucune icône correspondante
  }
};