// src/utils/countryConverter.js

// On crée l'objet de traduction une seule fois pour être plus performant.
const regionNames = new Intl.DisplayNames(['fr'], { type: 'region' });

/**
 * Convertit un code pays ISO (ex: "FR") en son nom complet en français (ex: "France").
 * @param {string} countryCode Le code pays à deux lettres.
 * @returns {string} Le nom complet du pays ou le code original s'il est invalide.
 */
export function getCountryName(countryCode) {
  if (!countryCode) {
    return '';
  }
  try {
    // .of() retourne le code lui-même si la traduction échoue, ce qui est un bon fallback.
    return regionNames.of(countryCode.toUpperCase());
  } catch (error) {
    // En cas d'erreur (ex: code invalide), on retourne le code original.
    return countryCode;
  }
}