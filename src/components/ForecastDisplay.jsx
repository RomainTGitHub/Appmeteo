// src/components/ForecastDisplay.jsx
import React from 'react';
import { getWeatherIcon } from './WeatherIcons';

function ForecastDisplay({ data }) {
    if (!data || !data.list) return null;

    // On regroupe les prévisions par jour, en prenant un élément par jour (index % 8)
    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);

    return (
        <div className="forecast-display">
            <h3>Prévisions sur 5 jours</h3>
            <div className="forecast-list">
                {dailyForecasts.map((forecast, index) => (
                    <div key={index} className="forecast-item">
                        <div className="forecast-content">
                            <div className="forecast-icon-container">
                                {getWeatherIcon(forecast.weather[0].id)}
                            </div>
                            <p className="forecast-date">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                            <p className="forecast-temp">{Math.round(forecast.main.temp)}°C</p>
                            <p className="forecast-description">{forecast.weather[0].description}</p>
                            <p className="forecast-humidity">Humidité : {forecast.main.humidity}%</p>
                            <p className="forecast-wind">Vent : {Math.round(forecast.wind.speed)} m/s</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastDisplay;