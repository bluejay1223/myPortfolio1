-- Supabase Analytics Setup Script

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create time_spent table
CREATE TABLE IF NOT EXISTS time_spent (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  time_spent INTEGER NOT NULL, -- in milliseconds
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create click_events table
CREATE TABLE IF NOT EXISTS click_events (
  id SERIAL PRIMARY KEY,
  element TEXT NOT NULL,
  page TEXT NOT NULL,
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_time_spent_timestamp ON time_spent(timestamp);
CREATE INDEX IF NOT EXISTS idx_click_events_timestamp ON click_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_time_spent_session ON time_spent(session_id);
CREATE INDEX IF NOT EXISTS idx_click_events_session ON click_events(session_id);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_spent ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for demo purposes)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations on page_views" ON page_views FOR ALL USING (true);
CREATE POLICY "Allow all operations on time_spent" ON time_spent FOR ALL USING (true);
CREATE POLICY "Allow all operations on click_events" ON click_events FOR ALL USING (true); 
