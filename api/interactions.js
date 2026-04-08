const { getInteractions } = require('../index.js');

/**
 * Get all interactions for a specific drug
 * GET /api/interactions?drug=Aspirin
 */
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { drug } = req.query;

    if (!drug) {
      return res.status(400).json({
        error: 'Missing parameter',
        message: 'The drug query parameter is required',
        example: '/api/interactions?drug=Aspirin'
      });
    }

    const interactions = getInteractions(drug);

    return res.status(200).json({
      success: true,
      drug,
      count: interactions.length,
      interactions
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
