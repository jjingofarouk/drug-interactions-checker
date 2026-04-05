# drug-interactions-checker

A lightweight standalone npm library for checking medical drug interactions. Uses a comprehensive JSON dataset of known interactions.

## Installation

```bash
npm install drug-interactions-checker
```

## Usage

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

## Data Source

The data is included as a JSON file bundled within the module (`data.json`) and queries are made directly against this imported module data. The dataset contains fields:
- `drug`: First referenced drug
- `interacting_drug`: Second referenced drug
- `description`: A short summary of the interaction
- `extended_description`: Additional clinical details and extended information.
