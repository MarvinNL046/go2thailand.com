# Go2Thailand Social Media Automation with n8n 🚀

Deze n8n workflows automatiseren je Facebook en Instagram posts met content van je go2-thailand.com website!

## 📁 Workflow Files

### 1. **social-media-workflow.json** - Hoofdworkflow
- Post dagelijks automatisch naar FB/Instagram
- Selecteert random content per dag
- Verschillende content types per dag van de week
- Logt alle posts naar Google Sheets

### 2. **content-scheduler.json** - Content Kalender
- Genereert maandelijks een 30-dagen posting schema
- Optimale posting tijden voor Thailand audience
- Houdt rekening met speciale dagen (Songkran, etc.)

### 3. **analytics-tracker.json** - Performance Tracking
- Haalt dagelijks engagement metrics op
- Berekent performance scores
- Genereert wekelijkse rapporten
- Geeft content aanbevelingen

## 📊 Content Types & Schedule

**Maandag**: 🍜 Thai Food  
**Dinsdag**: 🏛️ Attractions  
**Woensdag**: 🏙️ Cities  
**Donderdag**: 🏖️ Beaches (IG) / 🎭 Culture (FB)  
**Vrijdag**: 🏆 Top 10 Guides  
**Zaterdag**: 🛕 Temples  
**Zondag**: 🎭 Culture  

## 🔧 Setup Instructions

### 1. Import Workflows
1. Open n8n
2. Create new workflow
3. Menu → Import from File
4. Upload elk JSON bestand

### 2. Setup Credentials
Je hebt deze credentials nodig:
- **Facebook Graph API** (Page access token)
- **Instagram Business API** 
- **Google Sheets API**
- **Slack** (optioneel voor notifications)

### 3. Google Sheets Setup
Maak 3 Google Sheets:
1. **Social Media Log** - Voor post history
2. **Content Calendar** - Voor planning
3. **Analytics** - Voor performance data

### 4. Content Data
De JSON files in `/data/social-media/` bevatten:
- 5 posts per content type
- Platform-specifieke captions
- Hashtags en links
- Affiliate link placeholders

## 📱 Platform Features

### Facebook Posts
- Langere, story-telling captions
- Link previews
- Call-to-action buttons
- Lokale event promotie

### Instagram Posts
- Kortere, visual-focused captions
- Maximum 30 hashtags
- Location tags
- Stories/Reels suggesties

## 💡 Tips & Tricks

1. **Test First**: Run workflows manually eerst
2. **Monitor**: Check Google Sheets logs dagelijks eerste week
3. **Optimize**: Pas posting tijden aan based op jouw audience
4. **Expand**: Voeg meer content toe aan JSON files
5. **Localize**: Voeg Nederlandse captions toe voor NL audience

## 🎯 Performance Metrics

De analytics tracker kijkt naar:
- Engagement rate (likes + comments / reach)
- Click-through rate
- Shares & saves
- Beste content types
- Optimale posting tijden

## 🚨 Troubleshooting

**Posts komen niet door?**
- Check API credentials
- Verify page/account permissions
- Test met manual trigger

**Geen analytics data?**
- Wacht 24 uur na post
- Check Instagram Insights enabled
- Verify API scopes

## 📈 Scaling Up

1. **Meer content types toevoegen**:
   - Hotels
   - Restaurants  
   - Travel tips
   - eSIM promos

2. **Multi-language**:
   - Nederlandse versies
   - Platform-specific talen

3. **Advanced Features**:
   - A/B testing
   - Audience targeting
   - Story automation
   - Reels scheduling

## 🔗 Nuttige Links

- [n8n Docs](https://docs.n8n.io)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Instagram API](https://developers.facebook.com/docs/instagram-api)

---

Happy automating! 🎉 Je Thailand content gaat viral! 🇹🇭