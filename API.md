# API Documentation

## Overview

The Drug Interaction Checker API provides endpoints to query drug interaction information. All endpoints return JSON responses.

## Base URL

```
https://your-deployment.vercel.app/api
```

## Endpoints

### 1. Check Drug Interaction

Checks if there's an interaction between two specific drugs.

**Endpoint:** `GET /check`

**Parameters:**
- `drug1` (string, required): First drug name
- `drug2` (string, required): Second drug name

**Example Request:**
```bash
curl "https://your-deployment.vercel.app/api/check?drug1=Aspirin&drug2=Ibuprofen"
```

**Example Response (Interaction Found):**
```json
{
  "success": true,
  "hasInteraction": true,
  "interaction": {
    "drug": "Aspirin",
    "interacting_drug": "Ibuprofen",
    "description": "Concurrent use of Aspirin and Ibuprofen may increase the risk of gastrointestinal bleeding and reduce the cardioprotective effects of Aspirin.",
    "extended_description": "Ibuprofen can antagonize the irreversible antiplatelet effect of Aspirin, particularly when taken concurrently..."
  }
}
```

**Example Response (No Interaction):**
```json
{
  "success": true,
  "hasInteraction": false,
  "message": "No interaction found between these drugs",
  "drugs": ["Aspirin", "Acetaminophen"]
}
```

---

### 2. Get All Interactions for a Drug

Retrieves all known interactions for a specific drug.

**Endpoint:** `GET /interactions`

**Parameters:**
- `drug` (string, required): Drug name

**Example Request:**
```bash
curl "https://your-deployment.vercel.app/api/interactions?drug=Warfarin"
```

**Example Response:**
```json
{
  "success": true,
  "drug": "Warfarin",
  "count": 2,
  "interactions": [
    {
      "drug": "Warfarin",
      "interacting_drug": "Acetaminophen",
      "description": "Combining Acetaminophen with Warfarin can increase the risk of bleeding...",
      "extended_description": "..."
    },
    {
      "drug": "Warfarin",
      "interacting_drug": "Ciprofloxacin",
      "description": "...",
      "extended_description": "..."
    }
  ]
}
```

---

### 3. Get All Interactions (Paginated)

Retrieves all drug interactions with pagination support.

**Endpoint:** `GET /all`

**Parameters:**
- `limit` (integer, optional, default: 20): Number of results per page (max 100)
- `offset` (integer, optional, default: 0): Number of results to skip

**Example Request:**
```bash
curl "https://your-deployment.vercel.app/api/all?limit=10&offset=0"
```

**Example Response:**
```json
{
  "success": true,
  "total": 42,
  "limit": 10,
  "offset": 0,
  "count": 10,
  "interactions": [
    {
      "drug": "Acetaminophen",
      "interacting_drug": "Warfarin",
      "description": "...",
      "extended_description": "..."
    },
    ...
  ]
}
```

---

### 4. Health Check

Returns the health status of the API.

**Endpoint:** `GET /health`

**Example Request:**
```bash
curl "https://your-deployment.vercel.app/api/health"
```

**Example Response:**
```json
{
  "success": true,
  "status": "API is running",
  "version": "1.0.0",
  "timestamp": "2026-04-09T12:00:00Z"
}
```

---

## Response Format

All successful responses follow this structure:
```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing/invalid parameters) |
| 405 | Method Not Allowed (use GET) |
| 500 | Internal Server Error |

## Rate Limiting

Vercel has default rate limits. Check your plan for specifics. RapidAPI may impose additional rate limits based on your pricing tier.

## CORS

All endpoints support CORS for cross-origin requests.

## Usage Examples

### JavaScript/Node.js
```javascript
const fetch = require('node-fetch');

async function checkInteraction(drug1, drug2) {
  const res = await fetch(
    `https://your-deployment.vercel.app/api/check?drug1=${drug1}&drug2=${drug2}`
  );
  return res.json();
}

checkInteraction('Aspirin', 'Ibuprofen').then(console.log);
```

### Python
```python
import requests

def check_interaction(drug1, drug2):
    url = f"https://your-deployment.vercel.app/api/check?drug1={drug1}&drug2={drug2}"
    response = requests.get(url)
    return response.json()

print(check_interaction('Aspirin', 'Ibuprofen'))
```

### cURL
```bash
# Check interaction
curl "https://your-deployment.vercel.app/api/check?drug1=Aspirin&drug2=Ibuprofen"

# Get interactions for a drug
curl "https://your-deployment.vercel.app/api/interactions?drug=Aspirin"

# Get all interactions
curl "https://your-deployment.vercel.app/api/all?limit=20&offset=0"
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/jjingofarouk/drug-interactions-checker/issues
- Email: jjingofarouq@gmail.com
