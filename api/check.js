const { checkInteraction } = require('../index.js');
const analytics = require('./middleware/analytics');

/**
 * Check drug interaction between two drugs
 * GET /api/check?drug1=Aspirin&drug2=Ibuprofen
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
    analytics.trackRequest(req, 'check', 405, responseTime);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { drug1, drug2 } = req.query;

    if (!drug1 || !drug2) {
      const responseTime = Date.now() - startTime;
      analytics.trackRequest(req, 'check', 400, responseTime);
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Both drug1 and drug2 query parameters are required',
        example: '/api/check?drug1=Aspirin&drug2=Ibuprofen'
      });
    }

    const interaction = checkInteraction(drug1, drug2);

    if (interaction) {
      const responseTime = Date.now() - startTime;
      analytics.trackRequest(req, 'check', 200, responseTime);
      return res.status(200).json({
        success: true,
        hasInteraction: true,
        interaction
      });
    } else {
      const responseTime = Date.now() - startTime;
      analytics.trackRequest(req, 'check', 200, responseTime);
      return res.status(200).json({
        success: true,
        hasInteraction: false,
        message: 'No interaction found between these drugs',
        drugs: [drug1, drug2]
      });
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    analytics.trackRequest(req, 'check', 500, responseTime);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

module.exports = handler;
