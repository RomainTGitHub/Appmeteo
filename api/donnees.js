// /api/donnees.js
import axios from 'axios';

export default async function handler(req, res) {
  const { city } = req.query; // Récupère le nom de la ville
  const apiKey = process.env.API_KEY; // Accès sécurisé à la clé Vercel

  if (!city || !apiKey) {
    return res.status(400).json({ error: 'La ville ou la clé API est manquante.' });
  }

  try {
    // Appels sécurisés à l'API OpenWeatherMap depuis le serveur
    const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`);

    // Retourne les données combinées en un seul objet
    res.status(200).json({
      weather: currentWeatherResponse.data,
      forecast: forecastResponse.data
    });
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: 'Erreur lors de la récupération des données.' });
  }
}