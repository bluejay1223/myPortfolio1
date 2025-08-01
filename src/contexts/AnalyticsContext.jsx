import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../lib/supabase';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();
  const pageStartTime = useRef(Date.now());
  const currentPage = useRef(location.pathname);
  const hasTrackedPage = useRef(false);

  // Track page views (only once per route change)
  useEffect(() => {
    const page = location.pathname;
    
    // Only track if we haven't already tracked this page view
    if (!hasTrackedPage.current) {
      analyticsService.logPageView(page);
      hasTrackedPage.current = true;
      pageStartTime.current = Date.now();
      currentPage.current = page;
    }

    // Reset tracking flag when page changes
    return () => {
      const timeSpent = Date.now() - pageStartTime.current;
      if (timeSpent > 1000) {
        analyticsService.logTimeSpent(currentPage.current, timeSpent);
      }
      hasTrackedPage.current = false;
    };
  }, [location.pathname]);

  // Track clicks
  const trackClick = (element, page = location.pathname) => {
    analyticsService.logClick(element, page);
  };

  const value = {
    trackClick
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 