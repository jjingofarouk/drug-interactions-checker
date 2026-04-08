# Testing Your API Locally

Before deploying to Vercel, you can test the API locally using the Vercel CLI.

## Prerequisites

```bash
npm install -g vercel  # Install Vercel CLI globally
```

## Running Your API Locally

From your project root directory:

```bash
vercel dev
```

This will start a local development environment that simulates your Vercel deployment. By default, it runs on:
```
http://localhost:3000
```

## Testing Endpoints

Once the local server is running, test your endpoints:

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "API is running",
  "version": "1.0.0",
  "timestamp": "2026-04-09T..."
}
```

### 2. Check Drug Interaction
```bash
curl "http://localhost:3000/api/check?drug1=Aspirin&drug2=Ibuprofen"
```

Expected response:
```json
{
  "success": true,
  "hasInteraction": true,
  "interaction": {
    "drug": "Aspirin",
    "interacting_drug": "Ibuprofen",
    "description": "Concurrent use of Aspirin and Ibuprofen may increase the risk of gastrointestinal bleeding..."
  }
}
```

### 3. Get Interactions for a Drug
```bash
curl "http://localhost:3000/api/interactions?drug=Aspirin"
```

Expected response:
```json
{
  "success": true,
  "drug": "Aspirin",
  "count": 2,
  "interactions": [...]
}
```

### 4. Get All Interactions (Paginated)
```bash
curl "http://localhost:3000/api/all?limit=5&offset=0"
```

Expected response:
```json
{
  "success": true,
  "total": 42,
  "limit": 5,
  "offset": 0,
  "count": 5,
  "interactions": [...]
}
```

## Using API Testing Tools

### Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create a new collection
3. Add requests for each endpoint:

**Request 1: Health Check**
- Method: GET
- URL: `http://localhost:3000/api/health`

**Request 2: Check Interaction**
- Method: GET
- URL: `http://localhost:3000/api/check`
- Params: 
  - drug1: Aspirin
  - drug2: Ibuprofen

**Request 3: Get Interactions**
- Method: GET
- URL: `http://localhost:3000/api/interactions`
- Params:
  - drug: Aspirin

**Request 4: Get All**
- Method: GET
- URL: `http://localhost:3000/api/all`
- Params:
  - limit: 20
  - offset: 0

### Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Create requests following the same pattern as above

## Testing with Node.js/JavaScript

```javascript
const baseURL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    // Test health
    const health = await fetch(`${baseURL}/health`);
    console.log('Health:', await health.json());

    // Test check interaction
    const check = await fetch(`${baseURL}/check?drug1=Aspirin&drug2=Ibuprofen`);
    console.log('Check:', await check.json());

    // Test get interactions
    const interactions = await fetch(`${baseURL}/interactions?drug=Aspirin`);
    console.log('Interactions:', await interactions.json());

    // Test get all
    const all = await fetch(`${baseURL}/all?limit=5`);
    console.log('All:', await all.json());
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
```

## Debugging

### Enable Verbose Logging
```bash
vercel dev --debug
```

### Check Logs
Vercel CLI will output function logs in the terminal. Look for:
- Function execution time
- Errors or exceptions
- Request/response data

### Common Issues

**Port already in use:**
```bash
vercel dev --listen 3001  # Use a different port
```

**Function not found:**
- Verify files are in `api/` directory
- Check vercel.json configuration
- Ensure exports are correct

**Data not loading:**
- Verify `data.json` path in `index.js`
- Check that data.json has correct structure

## Next Steps

After successful local testing:

1. Commit your changes
2. Push to GitHub
3. Deploy to Vercel using the production deployment method
4. Test the live API endpoints
5. List on RapidAPI

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.
