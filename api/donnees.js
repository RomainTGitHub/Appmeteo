// /api/donnees.js
import axios from 'axios';

export default async function handler(req, res) {
  const { city, q } = req.query; // Récupère le nom de la ville ou la requête de suggestion
  const apiKey = process.env.API_KEY; // Accès sécurisé à la clé Vercel
  
  if (!apiKey) {
    return res.status(500).json({ error: 'La clé API est manquante.' });
  }

  try {
    if (q) {
      // Endpoint pour les suggestions de ville
      const suggestionsResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`);
      return res.status(200).json(suggestionsResponse.data);
    }

    if (city) {
      // Endpoint pour la météo actuelle et les prévisions
      const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
      
      return res.status(200).json({
        weather: currentWeatherResponse.data,
        forecast: forecastResponse.data
      });
    }

    res.status(400).json({ error: 'Ville ou requête de suggestion manquante.' });

  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: 'Erreur lors de la récupération des données.' });
  }
}