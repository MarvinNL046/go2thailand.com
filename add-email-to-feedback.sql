-- Add email support to existing feedback system
-- Run this AFTER the main setup script

-- 1. Add email column to feedback table
ALTER TABLE feedback 
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS email_optin BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- 2. Create email_subscriptions table for managing email preferences
CREATE TABLE IF NOT EXISTS email_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained')),
    source VARCHAR(50) DEFAULT 'feedback', -- feedback, newsletter, etc.
    preferences JSONB DEFAULT '{}', -- Voor site-specifieke voorkeuren
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, email)
);

-- 3. Create email_activities table voor tracking
CREATE TABLE IF NOT EXISTS email_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- sent, opened, clicked, bounced, complained
    activity_data JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_feedback_email ON feedback(email);
CREATE INDEX IF NOT EXISTS idx_feedback_email_optin ON feedback(email_optin);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_site_id ON email_subscriptions(site_id);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_status ON email_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_email_activities_site_email ON email_activities(site_id, email);

-- 5. Enable RLS on new tables
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_activities ENABLE ROW LEVEL SECURITY;

-- 6. Policies for email_subscriptions
CREATE POLICY "Anyone can subscribe" 
ON email_subscriptions FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Users can update own subscription" 
ON email_subscriptions FOR UPDATE 
TO anon 
USING (email = current_setting('request.jwt.claims', true)::json->>'email')
WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Service role can read all subscriptions" 
ON email_subscriptions FOR SELECT 
TO service_role 
USING (true);

-- 7. Policies for email_activities
CREATE POLICY "Service role can manage email activities" 
ON email_activities FOR ALL 
TO service_role 
USING (true);

-- 8. Function to handle email opt-in from feedback
CREATE OR REPLACE FUNCTION handle_feedback_email_optin()
RETURNS TRIGGER AS $$
BEGIN
    -- Als email is opgegeven en optin is true
    IF NEW.email IS NOT NULL AND NEW.email_optin = true THEN
        -- Insert or update in email_subscriptions
        INSERT INTO email_subscriptions (site_id, email, source)
        VALUES (NEW.site_id, NEW.email, 'feedback')
        ON CONFLICT (site_id, email) 
        DO UPDATE SET 
            status = 'active',
            unsubscribed_at = NULL,
            updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create trigger for automatic subscription management
DROP TRIGGER IF EXISTS feedback_email_optin_trigger ON feedback;
CREATE TRIGGER feedback_email_optin_trigger
AFTER INSERT OR UPDATE ON feedback
FOR EACH ROW
EXECUTE FUNCTION handle_feedback_email_optin();

-- 10. View voor email statistics per site
CREATE OR REPLACE VIEW email_stats_by_site AS
SELECT 
    s.domain,
    s.name as site_name,
    s.category,
    COUNT(DISTINCT es.email) as total_subscribers,
    COUNT(DISTINCT CASE WHEN es.status = 'active' THEN es.email END) as active_subscribers,
    COUNT(DISTINCT f.email) as emails_from_feedback,
    COUNT(DISTINCT CASE WHEN f.email_optin = true THEN f.email END) as opted_in_from_feedback
FROM sites s
LEFT JOIN email_subscriptions es ON s.id = es.site_id
LEFT JOIN feedback f ON s.id = f.site_id
WHERE s.active = true
GROUP BY s.domain, s.name, s.category;

-- 11. View voor recent email activity
CREATE OR REPLACE VIEW recent_email_activity AS
SELECT 
    ea.*,
    s.domain,
    s.name as site_name
FROM email_activities ea
JOIN sites s ON ea.site_id = s.id
ORDER BY ea.timestamp DESC
LIMIT 500;

-- 12. Function to safely unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_email(
    p_site_domain TEXT,
    p_email TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_site_id UUID;
BEGIN
    -- Get site_id
    SELECT id INTO v_site_id FROM sites WHERE domain = p_site_domain;
    
    -- Update subscription status
    UPDATE email_subscriptions 
    SET 
        status = 'unsubscribed',
        unsubscribed_at = NOW(),
        updated_at = NOW()
    WHERE site_id = v_site_id AND email = p_email;
    
    -- Log activity
    INSERT INTO email_activities (site_id, email, activity_type, activity_data)
    VALUES (v_site_id, p_email, 'unsubscribed', '{"source": "manual"}');
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- 13. Function to get subscriber count per site
CREATE OR REPLACE FUNCTION get_subscriber_count(p_site_domain TEXT)
RETURNS TABLE(
    total_subscribers BIGINT,
    active_subscribers BIGINT,
    unsubscribed BIGINT
) AS $$
DECLARE
    v_site_id UUID;
BEGIN
    SELECT id INTO v_site_id FROM sites WHERE domain = p_site_domain;
    
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_subscribers,
        COUNT(CASE WHEN status = 'active' THEN 1 END)::BIGINT as active_subscribers,
        COUNT(CASE WHEN status = 'unsubscribed' THEN 1 END)::BIGINT as unsubscribed
    FROM email_subscriptions
    WHERE site_id = v_site_id;
END;
$$ LANGUAGE plpgsql;

-- 14. Privacy-compliant email export function
CREATE OR REPLACE FUNCTION export_active_emails(p_site_domain TEXT)
RETURNS TABLE(email VARCHAR, subscribed_at TIMESTAMPTZ) AS $$
DECLARE
    v_site_id UUID;
BEGIN
    SELECT id INTO v_site_id FROM sites WHERE domain = p_site_domain;
    
    RETURN QUERY
    SELECT 
        es.email,
        es.subscribed_at
    FROM email_subscriptions es
    WHERE es.site_id = v_site_id 
    AND es.status = 'active'
    ORDER BY es.subscribed_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 15. Test dat alles werkt
-- Voeg een test feedback entry toe met email
INSERT INTO feedback (
    site_id, 
    feedback, 
    rating, 
    page_url, 
    page_title, 
    type, 
    email, 
    email_optin
)
SELECT 
    id,
    'Test feedback with email',
    5,
    '/test',
    'Test Page',
    'form',
    'test@example.com',
    true
FROM sites 
WHERE domain = 'go2-thailand.com'
LIMIT 1;

-- Check results
SELECT * FROM email_stats_by_site WHERE domain = 'go2-thailand.com';