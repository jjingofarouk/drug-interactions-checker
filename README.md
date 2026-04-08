# drug-interactions-checker

A lightweight standalone npm library and REST API for checking medical drug interactions. Uses a comprehensive JSON dataset of known interactions.

**Now available as a REST API on RapidAPI!** 🎉

## Installation (NPM Library)

```bash
npm install drug-interactions-checker
```

### Library Usage

```javascript
const { checkInteraction, getInteractions, getAllInteractions } = require('drug-interactions-checker');

// 1. Check a specific interaction
const interaction = checkInteraction('Acetaminophen', 'Warfarin');
if (interaction) {
  console.log(interaction.description);
  // Example output: "Combining Acetaminophen with Warfarin can increase the risk of bleeding by elevating INR levels."
}

// 2. Get all interactions for a specific drug
const aspirinInteractions = getInteractions('Aspirin');
console.log(`Found ${aspirinInteractions.length} known interactions for Aspirin.`);
// Returns an array of interaction objects

// 3. Get the entire dataset
const allData = getAllInteractions();
```

## REST API (Vercel + RapidAPI)

This project is also deployed as a REST API for easy integration into web and mobile applications.

### Available Endpoints

- **Check Interaction**: `GET /api/check?drug1=Aspirin&drug2=Ibuprofen`
- **Get Drug Interactions**: `GET /api/interactions?drug=Aspirin`
- **Get All Interactions**: `GET /api/all?limit=20&offset=0`
- **Health Check**: `GET /api/health`

### API Documentation

For detailed API documentation, see [API.md](./API.md)

### Deployment Instructions

For instructions on deploying to Vercel and listing on RapidAPI, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Data Source

The data is included as a JSON file (`data.json`) and queries are made directly against this dataset. The dataset contains fields:
- `drug`: First referenced drug
- `interacting_drug`: Second referenced drug
- `description`: A short summary of the interaction
- `extended_description`: Additional clinical details and extended information.
