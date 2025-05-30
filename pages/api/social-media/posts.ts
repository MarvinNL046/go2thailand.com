import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Security: Add your n8n webhook key
  const authKey = req.headers['x-webhook-key'];
  if (authKey !== process.env.N8N_WEBHOOK_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const socialMediaDir = path.join(process.cwd(), 'data', 'social-media');
    
    // Check if directory exists
    if (!fs.existsSync(socialMediaDir)) {
      return res.status(404).json({ error: 'Social media directory not found' });
    }

    // Read all JSON files from the directory
    const files = fs.readdirSync(socialMediaDir)
      .filter(file => file.endsWith('.json') && file !== 'index.json');

    const posts = [];

    // Read each JSON file
    for (const file of files) {
      try {
        const filePath = path.join(socialMediaDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Handle files with arrays of posts
        if (Array.isArray(data)) {
          data.forEach(post => {
            // Add file reference for tracking
            post.sourceFile = file;
            
            // Validate required fields - check for imageUrl instead of image
            if (post.id && post.caption && (post.image || post.imageUrl)) {
              // Ensure both image and imageUrl are set for n8n compatibility
              if (!post.image) post.image = post.imageUrl;
              if (!post.imageUrl) post.imageUrl = post.image;
              posts.push(post);
            }
          });
        } else if (data.id && data.caption && (data.image || data.imageUrl)) {
          // Single post object
          data.sourceFile = file;
          if (!data.image) data.image = data.imageUrl;
          if (!data.imageUrl) data.imageUrl = data.image;
          posts.push(data);
        }
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
      }
    }

    // Sort by priority (if exists) or randomly
    const sortedPosts = posts.sort((a, b) => {
      if (a.priority && b.priority) {
        return b.priority - a.priority;
      }
      return Math.random() - 0.5;
    });

    res.status(200).json({ posts: sortedPosts });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}