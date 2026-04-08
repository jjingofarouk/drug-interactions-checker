const { checkInteraction } = require('../index.js');

/**
 * Check drug interaction between two drugs
 * GET /api/check?drug1=Aspirin&drug2=Ibuprofen
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
    const { drug1, drug2 } = req.query;

    if (!drug1 || !drug2) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Both drug1 and drug2 query parameters are required',
        example: '/api/check?drug1=Aspirin&drug2=Ibuprofen'
      });
    }

    const interaction = checkInteraction(drug1, drug2);

    if (interaction) {
      return res.status(200).json({
        success: true,
        hasInteraction: true,
        interaction
      });
    } else {
      return res.status(200).json({
        success: true,
        hasInteraction: false,
        message: 'No interaction found between these drugs',
        drugs: [drug1, drug2]
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

module.exports = handler;
