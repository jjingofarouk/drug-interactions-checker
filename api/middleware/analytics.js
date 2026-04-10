/**
 * Analytics middleware for tracking API requests
 * Tracks request metadata including method, path, status, and response time
 */

const analytics = {
  /**
   * Track API request
   * @param {Object} req - Request object
   * @param {Object} res - Response object  
   * @param {string} endpoint - API endpoint name
   * @param {number} statusCode - HTTP status code
   * @param {number} responseTime - Response time in ms
   */
  trackRequest(req, endpoint, statusCode, responseTime) {
    const timestamp = new Date().toISOString();
    const event = {
      timestamp,
      endpoint,
      method: req.method,
      statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.headers['user-agent'] || 'unknown',
      referer: req.headers['referer'] || 'unknown',
      // For Vercel deployment - this data is automatically captured
      // and visible in Vercel Dashboard > Functions analytics
    };

    // Log to console (Vercel captures these logs)
    console.log(`[${endpoint}] ${req.method} - ${statusCode} - ${responseTime}ms`);
    
    // Send to Vercel's built-in analytics via headers if available
    if (typeof process !== 'undefined' && process.env.VERCEL) {
      // Vercel automatically tracks function metrics
      // Status code and duration are automatically captured
    }

    return event;
  }
};

module.exports = analytics;
