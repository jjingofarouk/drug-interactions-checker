const { getAllInteractions } = require('../index.js');

/**
 * Get all drug interactions
 * GET /api/all?limit=10&offset=0
 */
function handler(req, res) {
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
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const allInteractions = getAllInteractions();
    const paginatedInteractions = allInteractions.slice(offset, offset + limit);

    return res.status(200).json({
      success: true,
      total: allInteractions.length,
      limit,
      offset,
      count: paginatedInteractions.length,
      interactions: paginatedInteractions
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

module.exports = handler;
