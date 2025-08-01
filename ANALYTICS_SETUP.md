# Analytics Dashboard Setup Guide

This guide will help you set up the analytics dashboard for your portfolio website.

## Prerequisites

- A Supabase account and project
- Node.js and npm installed

## Setup Instructions

### 1. Install Dependencies

The required dependencies have already been installed:
- `chart.js` - For creating charts
- `react-chartjs-2` - React wrapper for Chart.js
- `@supabase/supabase-js` - Supabase client
- `date-fns` - Date utility functions

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to SQL Editor and run the following SQL to create the required tables:

```sql
-- Create page_views table
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create time_spent table
CREATE TABLE time_spent (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  time_spent INTEGER NOT NULL, -- in milliseconds
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create click_events table
CREATE TABLE click_events (
  id SERIAL PRIMARY KEY,
  element TEXT NOT NULL,
  page TEXT NOT NULL,
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX idx_time_spent_timestamp ON time_spent(timestamp);
CREATE INDEX idx_click_events_timestamp ON click_events(timestamp);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_time_spent_session ON time_spent(session_id);
CREATE INDEX idx_click_events_session ON click_events(session_id);
```

### 3. Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

You can find these values in your Supabase project settings:
1. Go to Settings > API
2. Copy the "Project URL" and "anon public" key

### 4. Admin Password

The default admin password is set to `admin123`. You can change this in `src/components/AdminAuth.jsx`:

```javascript
const ADMIN_PASSWORD = 'your_secure_password_here';
```

### 5. Access the Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/analytics` in your browser
3. Enter the admin password to access the dashboard

## Features

The analytics dashboard includes:

- **Page Views**: Track how many times each page is visited
- **Time Spent**: Monitor how long users spend on each section
- **Click Events**: See which elements are clicked most frequently
- **Daily Trends**: View page view trends over time
- **Session Tracking**: Track unique user sessions
- **Date Range Filtering**: Filter data by different time periods

## Data Privacy

The analytics system respects user privacy by:
- Not collecting personally identifiable information
- Using session-based tracking instead of persistent user IDs
- Storing data anonymously
- Not using cookies for tracking

## Customization

You can customize the analytics by:

1. **Adding more tracking points**: Use the `trackClick` function from `useAnalytics` hook
2. **Modifying charts**: Update the chart configurations in `Analytics.jsx`
3. **Adding new metrics**: Extend the Supabase tables and update the dashboard
4. **Styling**: Modify the CSS files to match your design

## Troubleshooting

### Dashboard not loading data
- Check your Supabase credentials in the `.env` file
- Verify the tables were created correctly in Supabase
- Check the browser console for any errors

### Charts not displaying
- Ensure Chart.js dependencies are properly installed
- Check that data is being logged to Supabase
- Verify the date range selection

### Authentication issues
- Clear browser localStorage and try again
- Check that the admin password is set correctly
- Ensure the AdminAuth component is properly imported

## Security Considerations

For production use, consider:
- Implementing proper authentication with Supabase Auth
- Adding rate limiting to prevent abuse
- Using Row Level Security (RLS) in Supabase
- Implementing proper session management
- Adding HTTPS enforcement 