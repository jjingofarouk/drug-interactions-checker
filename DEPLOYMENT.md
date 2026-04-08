# Deployment Setup Guide

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Account** - Your code should be on GitHub
3. **RapidAPI Account** - Sign up at https://rapidapi.com

## Step 1: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. From your project root, run:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to your GitHub account
   - Select your project
   - Accept default settings or customize as needed

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Connect your GitHub repository
4. Select the `drug-interaction-checker` repository
5. Configure project settings:
   - Framework: Other
   - Root Directory: ./
   - Build Command: Leave empty
   - Output Directory: Leave empty
6. Click "Deploy"

## Step 2: Verify Deployment

Once deployed, test your API endpoints:

```bash
# Health check
curl https://your-deployment.vercel.app/api/health

# Check drug interaction
curl "https://your-deployment.vercel.app/api/check?drug1=Aspirin&drug2=Ibuprofen"

# Get all interactions for a drug
curl "https://your-deployment.vercel.app/api/interactions?drug=Aspirin"

# Get all interactions (paginated)
curl "https://your-deployment.vercel.app/api/all?limit=10&offset=0"
```

## Step 3: List on RapidAPI

1. **Create API on RapidAPI:**
   - Go to https://rapidapi.com/developer
   - Click "Create New API"
   - Fill in API details:
     - **API Name**: Drug Interaction Checker
     - **Description**: A lightweight API for checking drug interactions with detailed information
     - **Base URL**: https://your-deployment.vercel.app/api
     - **Category**: Healthcare / Medical

2. **Define API Endpoints:**
   
   For each endpoint, click "Add Endpoint":

   **Endpoint 1: Check Interaction**
   - Name: `Check Interaction`
   - Method: `GET`
   - URL: `/check`
   - Parameters:
     - `drug1` (string, required)
     - `drug2` (string, required)

   **Endpoint 2: Get Interactions**
   - Name: `Get Drug Interactions`
   - Method: `GET`
   - URL: `/interactions`
   - Parameters:
     - `drug` (string, required)

   **Endpoint 3: Get All**
   - Name: `Get All Interactions`
   - Method: `GET`
   - URL: `/all`
   - Parameters:
     - `limit` (number, optional, default: 20)
     - `offset` (number, optional, default: 0)

   **Endpoint 4: Health**
   - Name: `Health Check`
   - Method: `GET`
   - URL: `/health`

3. **Add Authentication (Optional):**
   - Choose API Key from headers
   - Add pricing plans (free tier recommended for initial launch)

4. **Write Documentation:**
   - Add detailed descriptions for each endpoint
   - Include example requests and responses
   - Upload the `openapi.yaml` file for automatic documentation

5. **Review and Publish:**
   - Preview your API listing
   - Submit for approval
   - Once approved, it will be publicly available

## Step 4: Monitor and Maintain

### Monitor Deployments:
- Use Vercel Dashboard to monitor function performance
- Check logs for errors

### Update Your API:
```bash
# Make changes to your code
# Commit and push to GitHub
git add .
git commit -m "API improvements"
git push origin main

# Vercel will automatically redeploy
```

## Environment Variables (if needed later)

If you need to add environment variables to your Vercel deployment:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

## Troubleshooting

- **CORS Issues**: Already configured in API handlers
- **Function Timeout**: Default is 10 seconds (sufficient for this API)
- **Cold Starts**: Normal on first request, optimize by keeping functions simple
- **Data Size**: The interaction data is small enough to handle efficiently

## Next Steps

After publishing on RapidAPI:
1. Add usage examples and tutorials
2. Engage with API consumers
3. Gather feedback for improvements
4. Consider adding more features:
   - Drug warnings/side effects
   - Dosage information
   - Alternative drug suggestions
   - Multi-drug interaction checking
