# Google Sheets Template for Content Tracking

## Sheet Setup

### 1. Create New Google Sheet
- Name: "Go2Thailand Social Media Tracking"
- Add headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Content_ID | Content_Type | Content_Title | Post_Date | Facebook_Post_ID | Instagram_Post_ID | Hashtags | Location | Source_File | Facebook_Status | Instagram_Status |

### 2. Column Descriptions

- **A: Content_ID** - Unique post identifier (e.g., "food-001", "city-bangkok")
- **B: Content_Type** - Content category (food, city, attraction, beach, temple, culture)
- **C: Content_Title** - Human readable title of the post
- **D: Post_Date** - ISO timestamp when posted
- **E: Facebook_Post_ID** - Facebook's returned post ID or "FAILED"
- **F: Instagram_Post_ID** - Instagram's returned post ID or "FAILED"
- **G: Hashtags** - All hashtags used in the post
- **H: Location** - Geographic location tag
- **I: Source_File** - JSON file where content originated
- **J: Facebook_Status** - "SUCCESS" or "ERROR: [message]"
- **K: Instagram_Status** - "SUCCESS" or "ERROR: [message]"

### 3. Share Settings
1. Click "Share" in top right
2. Add your n8n service account email
3. Set permission to "Editor"
4. Copy the Sheet ID from URL

### 4. Sample Data Row
```
food-001 | food | Pad Thai - Thailand's Most Famous Dish | 2024-01-15T10:30:00Z | 123456789 | 987654321 | #PadThai #ThaiFood #Go2Thailand | Bangkok, Thailand | food.json | SUCCESS | SUCCESS
```

## Benefits

### Duplicate Prevention
- Workflow checks existing Content_IDs
- Never posts the same content twice
- Maintains content freshness

### Analytics Tracking
- See which content performs best
- Track posting frequency by type
- Monitor success/failure rates

### Content Planning
- View posting history at a glance
- Identify content gaps
- Plan future content strategy

### Error Monitoring
- Immediate visibility into posting failures
- Track which platforms have issues
- Debug with detailed error messages

## Advanced Formulas

### Count Posts by Type
```
=COUNTIF(B:B,"food")
=COUNTIF(B:B,"city")
=COUNTIF(B:B,"attraction")
```

### Success Rate Calculation
```
=COUNTIF(J:J,"SUCCESS")/COUNTA(J:J)
=COUNTIF(K:K,"SUCCESS")/COUNTA(K:K)
```

### Recent Posts (Last 7 Days)
```
=FILTER(A:K, D:D >= TODAY()-7)
```

### Most Used Hashtags
Create a pivot table with:
- Rows: Individual hashtags (split G column)
- Values: Count of hashtags

## Workflow Integration

The n8n workflow will:
1. Read all existing Content_IDs from column A
2. Fetch available posts from your website
3. Filter out already posted content
4. Select random post from remaining content
5. Post to Facebook & Instagram
6. Log results to new row in sheet

This ensures no duplicate posts while maintaining detailed tracking!