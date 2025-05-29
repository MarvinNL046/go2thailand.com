# 🚀 Go2Thailand Social Media Automatisering Setup Guide

Deze gids legt stap voor stap uit hoe je de complete social media automatisering opzet voor go2-thailand.com.

## 📋 Overzicht Wat We Gebouwd Hebben

1. **eSIM Pagina** (`/esim/`) - Voor affiliate marketing
2. **Social Media Showcase** (`/social/`) - Display je social posts
3. **n8n Automatisering** - Post dagelijks naar FB/Instagram
4. **Live Data API** - Haalt content uit je website

---

## 🛠️ STAP 1: Website Updates Deployen

### 1.1 Nieuwe Pagina's
De volgende nieuwe pagina's zijn toegevoegd:
- `/pages/esim/index.tsx` - eSIM providers pagina
- `/pages/social.tsx` - Social media showcase
- `/pages/api/social-media/[type].ts` - API voor n8n

### 1.2 Navigatie Updates
Header is geüpdatet met:
- eSIM link in hoofdmenu
- Social link in hoofdmenu
- Beide ook in mobiel menu

### 1.3 Deploy Stappen
```bash
# 1. Commit alle changes
git add .
git commit -m "Add eSIM and Social Media pages with n8n integration"

# 2. Push naar je repository
git push origin main

# 3. Deploy naar Vercel/Netlify
# (gebeurt meestal automatisch na push)
```

---

## 🔐 STAP 2: Environment Variables Setup

### 2.1 Voeg toe aan `.env.local`:
```env
# n8n Webhook Security (maak je eigen geheime key!)
N8N_WEBHOOK_KEY=maak-hier-een-lange-random-string-12345

# Perplexity API (als je die al hebt)
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxx
```

### 2.2 Voeg toe aan Vercel/Netlify:
Ga naar je hosting dashboard en voeg dezelfde environment variables toe.

---

## 📱 STAP 3: Facebook & Instagram Setup

### 3.1 Facebook Developer Account
1. Ga naar https://developers.facebook.com
2. Maak een app aan
3. Voeg "Instagram Basic Display" en "Pages API" toe

### 3.2 Benodigde Permissions
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `instagram_basic`
- `instagram_content_publish`

### 3.3 Get je tokens:
- **Facebook Page ID**: Vind in Page Settings
- **Instagram Business Account ID**: Via Facebook Business Manager
- **Access Token**: Generate via Graph API Explorer

---

## 🤖 STAP 4: n8n Setup

### 4.1 n8n Installeren
```bash
# Optie 1: Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

# Optie 2: NPM
npm install n8n -g
n8n start
```

### 4.2 Workflows Importeren

1. Open n8n op http://localhost:5678
2. Maak nieuwe workflow
3. Menu → Import from File
4. Upload deze file: `/n8n/social-media-workflow-live.json`

### 4.3 Credentials Toevoegen

In n8n, voeg deze credentials toe:

#### A. **Header Auth** (voor API beveiliging)
- Name: `n8nWebhookKey`
- Header Name: `x-webhook-key`
- Header Value: `jouw-geheime-key-uit-env`

#### B. **Facebook Graph API**
- Name: `Facebook Graph API`
- Access Token: `jouw-facebook-token`
- Add deze in workflow nodes

#### C. **Instagram API**
- Name: `Instagram Business API`
- Access Token: `zelfde-facebook-token`
- Business Account ID: `jouw-instagram-id`

#### D. **Google Sheets** (voor logging)
1. Maak 3 Google Sheets:
   - **Social Media Log** - columns: A-H (PostID, Type, Date, Platform, Message, Link, SocialID, Status)
   - **Content Calendar** - voor planning
   - **Analytics** - voor performance

2. Deel sheets met n8n service account
3. Voeg Google Sheets OAuth2 credential toe

---

## 📊 STAP 5: Google Sheets Setup

### 5.1 Social Media Log Sheet
Maak sheet met deze columns:
```
A: PostID
B: ContentType  
C: PostedAt
D: Platform
E: Message
F: Link
G: SocialPostID
H: Status
```

### 5.2 Sharing met n8n
1. Get n8n service account email uit credentials
2. Share alle 3 sheets met dit email
3. Geef "Editor" rechten

---

## 🚀 STAP 6: Testen

### 6.1 Test API Endpoint
```bash
# Test je API (vervang YOUR_KEY)
curl -H "x-webhook-key: YOUR_KEY" https://go2-thailand.com/api/social-media/food
```

### 6.2 Test n8n Workflow
1. Open workflow in n8n
2. Klik "Execute Workflow" 
3. Check voor errors in nodes
4. Bekijk output in laatste node

### 6.3 Manual Post Test
1. Zet schedule node uit
2. Run workflow manual
3. Check Facebook/Instagram voor post
4. Check Google Sheets voor log entry

---

## ⚙️ STAP 7: Automation Activeren

### 7.1 Schedule Activeren
1. In n8n workflow
2. Activeer de "Daily Schedule" node
3. Stel tijd in (bv 10:00 AM)
4. Save en Activate workflow

### 7.2 Content Rotatie
De workflow post automatisch:
- **Maandag**: Thai Food 🍜
- **Dinsdag**: Attractions 🏛️
- **Woensdag**: Cities 🏙️
- **Donderdag**: Beaches 🏖️
- **Vrijdag**: Attractions 🎯
- **Zaterdag**: Cities 🌆
- **Zondag**: Food 🥘

---

## 🔧 STAP 8: eSIM Pagina Aanpassen

### 8.1 Affiliate Links Toevoegen
In `/pages/esim/index.tsx`, vervang de placeholder links:
```typescript
affiliateLink: "https://jouw-affiliate-link.com/airalo"
```

### 8.2 Providers Aanpassen
Voeg je eigen eSIM providers toe of pas bestaande aan in `getStaticProps`

---

## 📈 STAP 9: Social Media Pagina

### 9.1 Echte Data Koppelen
De `/pages/social.tsx` gebruikt nu sample data. Voor echte data:

1. Maak API endpoint voor social metrics
2. Of gebruik Facebook/Instagram embed widgets
3. Update `getStaticProps` met echte data fetch

### 9.2 Social Links
Update deze links in de pagina:
```typescript
href="https://facebook.com/go2thailand"  // Jouw echte Facebook
href="https://instagram.com/go2thailand" // Jouw echte Instagram
```

---

## 🎯 STAP 10: Monitoring & Optimalisatie

### 10.1 Check Daily
- Google Sheets logs
- Social media engagement
- n8n execution history

### 10.2 Content Uitbreiden
De API haalt max 10-20 items per type. Voor meer variatie:
- Voeg meer content toe aan website
- Of roteer door verschillende queries

### 10.3 Performance Tracking
- Gebruik de analytics workflow (ook in n8n folder)
- Track welke content best performt
- Pas posting strategie aan

---

## 🚨 Troubleshooting

### "API returns 401 Unauthorized"
→ Check je N8N_WEBHOOK_KEY in .env.local

### "Facebook post failed"
→ Verify Page access token permissions

### "No content found"
→ Check of API endpoint live is op je website

### "Duplicate posts"
→ Google Sheets log checkt duplicates

---

## 📞 Support

Als je vast loopt:
1. Check n8n execution logs
2. Test API endpoints manual
3. Verify alle credentials
4. Check Google Sheets permissions

---

## 🎉 Success Checklist

- [ ] Website gedeployed met nieuwe pagina's
- [ ] Environment variables gezet
- [ ] Facebook/Instagram app geconfigureerd
- [ ] n8n draait met workflow
- [ ] Google Sheets aangemaakt en gedeeld
- [ ] API endpoint test succesvol
- [ ] Eerste manual post gelukt
- [ ] Schedule geactiveerd
- [ ] eSIM affiliate links toegevoegd
- [ ] Social media links geüpdatet

Klaar! Je Thailand website post nu automatisch naar social media! 🇹🇭✨