# Meta Cross-Posting Setup Guide

## Prerequisites

1. **Facebook Developer Account**
   - Go to https://developers.facebook.com/
   - Create a new app or use existing
   - App type: Business

2. **Instagram Business Account**
   - Convert Instagram to Business account
   - Link to Facebook Page
   - Must be admin of both

## Step-by-Step Setup

### 1. Create Meta App
1. Go to Meta for Developers
2. Create App → Business
3. Add Products:
   - Facebook Login
   - Instagram Basic Display
   - Instagram Graph API

### 2. Get Access Tokens

#### Facebook Page Token:
1. Go to Graph API Explorer
2. Select your app
3. Request permissions:
   - `pages_show_list`
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `instagram_basic`
   - `instagram_content_publish`
4. Generate User Token
5. Exchange for Page Token

#### Instagram Business ID:
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token={token}
```
Then for each page:
```
GET https://graph.facebook.com/v18.0/{page-id}?fields=instagram_business_account&access_token={token}
```

### 3. Configure n8n Workflow

1. Import `meta-cross-posting-workflow.json`
2. Edit the "Credentials" node:
   - `facebook_page_id`: Your Facebook Page ID
   - `facebook_access_token`: Your Page Access Token
   - `instagram_account_id`: Your Instagram Business Account ID
   - `instagram_access_token`: Same as Facebook token

### 4. Test the Workflow

1. Set webhook key in "Fetch Website Content" node
2. Run workflow manually first
3. Check both Facebook and Instagram for posts
4. Enable schedule when working

## Important Notes

- **Image Requirements:**
  - Must be publicly accessible HTTPS URLs
  - JPEG format recommended
  - Size: 320x320 to 1080x1080 pixels
  - Under 8MB

- **API Limits:**
  - 200 API calls per hour per user
  - 25 posts per day on Instagram
  - Content publishing limit: 25 per 24 hours

- **Token Expiration:**
  - User tokens: 60 days
  - Page tokens: No expiration (if generated from long-lived user token)
  - Refresh tokens before expiry

## Troubleshooting

### Common Errors:

1. **"Invalid OAuth access token"**
   - Token expired or incorrect
   - Regenerate token with correct permissions

2. **"The Instagram account is not connected"**
   - Link Instagram to Facebook Page
   - Ensure Business account

3. **"Media creation failed"**
   - Check image URL is public
   - Verify image format and size

4. **"Rate limit exceeded"**
   - Implement delays between posts
   - Check API usage in Meta dashboard

## Webhook URLs

Replace these in the workflow:
- `YOUR_WEBHOOK_URL_HERE`: Success logging endpoint
- `YOUR_ERROR_WEBHOOK_URL_HERE`: Error logging endpoint

Or remove these nodes if not needed.