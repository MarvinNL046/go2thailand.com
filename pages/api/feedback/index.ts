import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabase';
import { getSiteDomain } from '../../../lib/site-config';

type FeedbackData = {
  rating: number;
  message: string;
  email?: string;
  emailOptin?: boolean;
  page_url: string;
  page_title: string;
  site_domain?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rating, message, email, emailOptin, page_url, page_title }: FeedbackData = req.body;

    // Validate required fields
    if (!rating || !message || !page_url || !page_title) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['rating', 'message', 'page_url', 'page_title']
      });
    }

    // Validate types
    if (typeof rating !== 'number' || typeof message !== 'string' || typeof page_url !== 'string' || typeof page_title !== 'string') {
      return res.status(400).json({ error: 'Invalid field types' });
    }

    // Validate rating range
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
    }

    // Validate string lengths
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message must be under 5000 characters' });
    }
    if (page_url.length > 2000 || page_title.length > 500) {
      return res.status(400).json({ error: 'URL or title too long' });
    }

    // Validate email format if provided
    if (email && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Strip HTML tags from text inputs to prevent stored XSS
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, '');
    const sanitizedMessage = sanitize(message.trim());
    const sanitizedTitle = sanitize(page_title.trim());

    // Get the current site domain
    const siteDomain = getSiteDomain();

    // First, ensure the site exists in the sites table
    const { data: site } = await supabaseAdmin
      .from('sites')
      .select('id')
      .eq('domain', siteDomain)
      .single();

    if (!site) {
      // Site doesn't exist, create it
      const { data: newSite, error: siteError } = await supabaseAdmin
        .from('sites')
        .insert({
          domain: siteDomain,
          name: 'Go2 Thailand',
          description: 'Your comprehensive guide to Thailand travel',
          category: 'travel',
          language: 'en'
        })
        .select('id')
        .single();

      if (siteError) {
        console.error('Error creating site:', siteError);
        return res.status(500).json({ error: 'Failed to initialize site' });
      }
    }

    // Get site_id
    const { data: siteData } = await supabaseAdmin
      .from('sites')
      .select('id')
      .eq('domain', siteDomain)
      .single();

    const site_id = siteData?.id || site?.id;

    // Insert feedback with site_id
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert({
        site_id,
        rating,
        feedback: sanitizedMessage,
        email: email ? email.trim().toLowerCase() : null,
        email_optin: email && emailOptin ? true : false,
        page_url: page_url.trim(),
        page_title: sanitizedTitle,
        type: 'form',
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting feedback:', error);
      return res.status(500).json({ error: 'Failed to submit feedback' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your feedback!',
      data 
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}