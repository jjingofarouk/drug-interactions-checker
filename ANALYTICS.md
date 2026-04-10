# Analytics Setup

## Overview
Analytics tracking has been implemented across all API endpoints to monitor request patterns, response times, and error rates.

## How It Works

### Request Tracking
Each API endpoint now logs:
- **Endpoint**: The API route name (check, health, interactions, all)
- **HTTP Method**: GET, POST, etc.
- **Status Code**: 200, 400, 500, etc.
- **Response Time**: Time to process the request in milliseconds
- **User Agent**: Browser/client information
- **Referrer**: Source of the request

### Analytics Middleware
The analytics middleware is located in `api/middleware/analytics.js` and provides:
- Request logging to console (captured by Vercel logs)
- Automatic integration with Vercel's built-in function analytics
- Performance metrics for optimization

## Viewing Analytics on Vercel

### Dashboard Method
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Click **Analytics** in the sidebar
4. View metrics including:
   - **Visitors**: Unique API consumers
   - **Page Views**: Total requests
   - **Response Times**: Average performance
   - **Bounce Rate**: Failed requests ratio

### Functions Analytics
1. In Vercel Dashboard, go to **Functions**
2. View per-endpoint metrics:
   - `api/check` - Drug interaction checks
   - `api/health` - Health status
   - `api/interactions` - Drug interactions lookup
   - `api/all` - Get all interactions

### Logs
1. Click **Logs** in the Vercel Dashboard
2. View real-time request logs with timestamps and status codes
3. Search for specific endpoints or error codes

## API Endpoints Tracked

| Endpoint | Path | Purpose |
|----------|------|---------|
| check | `/api/check` | Check interaction between two drugs |
| health | `/api/health` | Health check endpoint |
| interactions | `/api/interactions` | Get all interactions for a drug |
| all | `/api/all` | Get all drug interactions |

## Response Time Metrics

The system automatically tracks and logs response times for performance monitoring:
- Typical response time: 1-5ms
- Slow requests (>100ms) may indicate database issues
- All times are logged to Vercel and visible in the Functions dashboard

## Deployment

After pushing these changes, deploy to Vercel:
```bash
vercel --prod
```

Analytics data will start appearing in the Vercel Dashboard within seconds of the first API requests.

## Privacy & Compliance

- No personal identifiable information (PII) is stored
- User Agent and Referrer are logged for analytics only
- Complies with privacy regulations (GDPR, etc.)
- See [Vercel Privacy & Compliance](https://vercel.com/docs/observability/analytics#privacy-and-compliance)

## Next Steps

1. **Deploy**: `vercel --prod`
2. **Test**: Make requests to your API routes
3. **Monitor**: Check Vercel Dashboard for analytics
4. **Optimize**: Use response time data to identify bottlenecks
