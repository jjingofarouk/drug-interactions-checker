const interactions = require('./data.json');

/**
 * Normalizes drug name for comparison
 * @param {string} name 
 * @returns {string}
 */
const normalize = (name) => {
  if (!name) return '';
  return name.trim().toLowerCase();
};

/**
 * Checks if there's an interaction between two specific drugs
 * @param {string} drug1 
 * @param {string} drug2 
 * @returns {Object|null} The interaction object or null if none found
 */
function checkInteraction(drug1, drug2) {
  if (!drug1 || !drug2) return null;
  const norm1 = normalize(drug1);
  const norm2 = normalize(drug2);

  const found = interactions.find(interaction => 
    (normalize(interaction.drug) === norm1 && normalize(interaction.interacting_drug) === norm2) ||
    (normalize(interaction.drug) === norm2 && normalize(interaction.interacting_drug) === norm1)
  );

  return found || null;
}

/**
 * Gets all known interactions for a specific drug
 * @param {string} drug 
 * @returns {Array<Object>} List of interaction objects for the drug
 */
function getInteractions(drug) {
  if (!drug) return [];
  const norm = normalize(drug);

  return interactions.filter(interaction => 
    normalize(interaction.drug) === norm || normalize(interaction.interacting_drug) === norm
  );
}

/**
 * Returns the entire interaction dataset
 * @returns {Array<Object>} Array of all interactions
 */
function getAllInteractions() {
  return interactions;
}

module.exports = {
  checkInteraction,
  getInteractions,
  getAllInteractions
};
