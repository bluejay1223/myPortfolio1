// Mock analytics service for demo purposes
// This stores data in localStorage instead of Supabase

const STORAGE_KEYS = {
  PAGE_VIEWS: 'analytics_page_views',
  TIME_SPENT: 'analytics_time_spent',
  CLICK_EVENTS: 'analytics_click_events'
};

const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const mockAnalyticsService = {
  // Log page view
  async logPageView(page, userId = null) {
    const pageViews = getStorageData(STORAGE_KEYS.PAGE_VIEWS);
    const newView = {
      id: Date.now(),
      page,
      user_id: userId,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
    };
    pageViews.push(newView);
    setStorageData(STORAGE_KEYS.PAGE_VIEWS, pageViews);
    return { data: newView, error: null };
  },

  // Log time spent on page
  async logTimeSpent(page, timeSpent, userId = null) {
    const timeSpentData = getStorageData(STORAGE_KEYS.TIME_SPENT);
    const newRecord = {
      id: Date.now(),
      page,
      time_spent: timeSpent,
      user_id: userId,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
    };
    timeSpentData.push(newRecord);
    setStorageData(STORAGE_KEYS.TIME_SPENT, timeSpentData);
    return { data: newRecord, error: null };
  },

  // Log click event
  async logClick(element, page, userId = null) {
    const clickEvents = getStorageData(STORAGE_KEYS.CLICK_EVENTS);
    const newClick = {
      id: Date.now(),
      element,
      page,
      user_id: userId,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
    };
    clickEvents.push(newClick);
    setStorageData(STORAGE_KEYS.CLICK_EVENTS, clickEvents);
    return { data: newClick, error: null };
  },

  // Get analytics data
  async getAnalytics(startDate, endDate) {
    const pageViews = getStorageData(STORAGE_KEYS.PAGE_VIEWS);
    const timeSpent = getStorageData(STORAGE_KEYS.TIME_SPENT);
    const clickEvents = getStorageData(STORAGE_KEYS.CLICK_EVENTS);

    // Filter by date range
    const filterByDate = (data) => {
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    };

    return {
      pageViews: filterByDate(pageViews),
      timeSpent: filterByDate(timeSpent),
      clickEvents: filterByDate(clickEvents),
      errors: []
    };
  },

  // Get session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  },

  // Clear all data (for testing)
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    sessionStorage.removeItem('analytics_session_id');
  }
}; 