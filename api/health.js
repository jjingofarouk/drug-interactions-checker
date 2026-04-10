const analytics = require('./middleware/analytics');

/**
 * Health check endpoint
 * GET /api/health
 */
function handler(req, res) {
  const startTime = Date.now();
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const responseTime = Date.now() - startTime;
  analytics.trackRequest(req, 'health', 200, responseTime);
  return res.status(200).json({
    success: true,
    status: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}

module.exports = handler;
