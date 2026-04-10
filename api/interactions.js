const { getInteractions } = require('../index.js');
const analytics = require('./middleware/analytics');

/**
 * Get all interactions for a specific drug
 * GET /api/interactions?drug=Aspirin
 */
function handler(req, res) {
  const startTime = Date.now();
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
    const responseTime = Date.now() - startTime;
    analytics.trackRequest(req, 'interactions', 405, responseTime);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { drug } = req.query;

    if (!drug) {
      const responseTime = Date.now() - startTime;
      analytics.trackRequest(req, 'interactions', 400, responseTime);
      return res.status(400).json({
        error: 'Missing parameter',
        message: 'The drug query parameter is required',
        example: '/api/interactions?drug=Aspirin'
      });
    }

    const interactions = getInteractions(drug);
    const responseTime = Date.now() - startTime;
    analytics.trackRequest(req, 'interactions', 200, responseTime);

    return res.status(200).json({
      success: true,
      drug,
      count: interactions.length,
      interactions
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    analytics.trackRequest(req, 'interactions', 500, responseTime);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

module.exports = handler;
