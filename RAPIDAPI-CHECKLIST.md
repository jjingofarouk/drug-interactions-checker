# RapidAPI Listing Checklist

Follow this checklist to successfully list your API on RapidAPI and deploy it to Vercel.

## Pre-Deployment Checklist

- [ ] Update `openapi.yaml` - Replace `{your-deployment}` with your actual Vercel domain
- [ ] Update `API.md` - Replace `your-deployment.vercel.app` with your actual domain
- [ ] Commit all changes to GitHub

## Vercel Deployment Checklist

### Prerequisites
- [ ] GitHub account with access to your repo
- [ ] Vercel account created (https://vercel.com)

### Deployment Steps
- [ ] Log in to https://vercel.com/dashboard
- [ ] Click "New Project"
- [ ] Select your GitHub organization/account
- [ ] Search for and select `drug-interaction-checker` repo
- [ ] Accept default settings
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note your deployment URL (format: `https://drug-interaction-checker-xxx.vercel.app`)

### Post-Deployment Testing
- [ ] Test health endpoint: Visit `https://your-url.vercel.app/api/health`
- [ ] Test check endpoint with sample drugs
- [ ] Test interactions endpoint
- [ ] Test all endpoint with pagination
- [ ] Verify CORS is working

## RapidAPI Setup Checklist

### Account & API Creation
- [ ] Create RapidAPI account (https://rapidapi.com)
- [ ] Go to https://rapidapi.com/developer
- [ ] Click "Create New API"
- [ ] Fill in API details:
  - [ ] API Name: "Drug Interaction Checker"
  - [ ] Description: Copy from your README
  - [ ] Category: "Healthcare/Medical" or "Health"
  - [ ] Base URL: `https://your-deployment.vercel.app/api`

### Endpoint Configuration
- [ ] Add endpoint: `Check Interaction`
  - [ ] Method: GET
  - [ ] URL: /check
  - [ ] Add parameters: drug1 (string), drug2 (string)

- [ ] Add endpoint: `Get Drug Interactions`
  - [ ] Method: GET
  - [ ] URL: /interactions
  - [ ] Add parameter: drug (string)

- [ ] Add endpoint: `Get All Interactions`
  - [ ] Method: GET
  - [ ] URL: /all
  - [ ] Add parameters: limit (number), offset (number)

- [ ] Add endpoint: `Health Check`
  - [ ] Method: GET
  - [ ] URL: /health

### Documentation
- [ ] Add endpoint descriptions
- [ ] Include example requests and responses
- [ ] Upload or paste `openapi.yaml` content
- [ ] Add code examples (JavaScript, Python, cURL)

### Authentication & Pricing
- [ ] Set authentication method (API Key from header recommended)
- [ ] Create a free tier plan (recommended for initial launch)
- [ ] Add pricing tier description

### Submission
- [ ] Review all endpoint configurations
- [ ] Test each endpoint in RapidAPI tester
- [ ] Add comprehensive documentation
- [ ] Preview API listing
- [ ] Submit for RapidAPI approval
- [ ] Wait for approval (usually 24-48 hours)

## Post-Launch Checklist

- [ ] Share RapidAPI link on social media
- [ ] Add RapidAPI badge to GitHub README
- [ ] Monitor API usage in Vercel dashboard
- [ ] Check RapidAPI analytics
- [ ] Respond to API requests and feedback
- [ ] Consider adding more endpoints:
  - [ ] Drug side effects
  - [ ] Dosage information
  - [ ] Alternative drugs
  - [ ] Multi-drug interactions

## Troubleshooting

### Common Issues

**Endpoints return 501 errors:**
- Verify all files are in the `api/` directory
- Check that function names match the vercel.json routes

**CORS errors:**
- Already configured in all endpoint handlers
- If still having issues, update vercel.json routes

**Approval stuck on RapidAPI:**
- Make sure API is publicly accessible
- All endpoints should return 200 on valid requests
- Add comprehensive documentation
- Test all endpoints before submission

**Rate limiting issues:**
- Check Vercel function timeout settings
- Optimize database queries if applicable
- Monitor cold start times

## Support

- Vercel Docs: https://vercel.com/docs
- RapidAPI Docs: https://rapidapi.com/documentation
- GitHub Issues: https://github.com/jjingofarouk/drug-interactions-checker/issues

