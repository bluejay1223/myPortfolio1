# Quick Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be ready

## Step 2: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-setup.sql`
3. Click **Run** to execute the script

## Step 3: Get Your Credentials

1. Go to **Settings** > **API**
2. Copy the **Project URL** and **anon public** key

## Step 4: Create Environment File

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 5: Test the Connection

1. Start your development server: `npm run dev`
2. Go to `/analytics` and login with password: `admin123`
3. Click "Add Demo Data" to test the connection

## Troubleshooting

### "Failed to load analytics data" error
- Check your `.env` file has the correct credentials
- Verify the tables were created in Supabase
- Check browser console for specific error messages

### "Failed to add demo data" error
- Ensure your Supabase project is active
- Check that RLS policies allow insert operations
- Verify your anon key has the correct permissions

## Next Steps

Once connected, your analytics will be stored in Supabase and you can:
- View data in the Supabase dashboard
- Set up automated backups
- Create custom queries
- Integrate with other services 