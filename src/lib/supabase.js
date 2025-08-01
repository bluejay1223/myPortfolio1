import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Analytics service functions
export const analyticsService = {
  // Log page view
  async logPageView(page, userId = null) {
    const { data, error } = await supabase
      .from('page_views')
      .insert([
        {
          page,
          user_id: userId,
          timestamp: new Date().toISOString(),
          session_id: this.getSessionId(),
        }
      ]);
    
    if (error) console.error('Error logging page view:', error);
    return { data, error };
  },

  // Log time spent on page
  async logTimeSpent(page, timeSpent, userId = null) {
    const { data, error } = await supabase
      .from('time_spent')
      .insert([
        {
          page,
          time_spent: timeSpent,
          user_id: userId,
          timestamp: new Date().toISOString(),
          session_id: this.getSessionId(),
        }
      ]);
    
    if (error) console.error('Error logging time spent:', error);
    return { data, error };
  },

  // Log click event
  async logClick(element, page, userId = null) {
    const { data, error } = await supabase
      .from('click_events')
      .insert([
        {
          element,
          page,
          user_id: userId,
          timestamp: new Date().toISOString(),
          session_id: this.getSessionId(),
        }
      ]);
    
    if (error) console.error('Error logging click:', error);
    return { data, error };
  },

  // Get analytics data
  async getAnalytics(startDate, endDate) {
    const { data: pageViews, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*')
      .gte('timestamp', startDate)
      .lte('timestamp', endDate);

    const { data: timeSpent, error: timeSpentError } = await supabase
      .from('time_spent')
      .select('*')
      .gte('timestamp', startDate)
      .lte('timestamp', endDate);

    const { data: clickEvents, error: clickEventsError } = await supabase
      .from('click_events')
      .select('*')
      .gte('timestamp', startDate)
      .lte('timestamp', endDate);

    return {
      pageViews: pageViews || [],
      timeSpent: timeSpent || [],
      clickEvents: clickEvents || [],
      errors: [pageViewsError, timeSpentError, clickEventsError].filter(Boolean)
    };
  },

  // Get session ID (simple implementation)
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}; 