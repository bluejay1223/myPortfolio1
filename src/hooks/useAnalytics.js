import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../lib/supabase';

// Global tracking state to prevent duplicate logs
let lastTrackedPage = null;
let pageStartTime = Date.now();

export const useAnalytics = () => {
  const location = useLocation();
  const currentPage = useRef(location.pathname);

  // Track page views (only once per route change)
  useEffect(() => {
    const page = location.pathname;
    
    // Only log if this is a new page (not already tracked)
    if (page !== lastTrackedPage) {
      // Log page view
      analyticsService.logPageView(page);
      lastTrackedPage = page;
      
      // Reset timer for new page
      pageStartTime = Date.now();
      currentPage.current = page;
    }

    // Cleanup function to log time spent when component unmounts
    return () => {
      const timeSpent = Date.now() - pageStartTime;
      if (timeSpent > 1000 && currentPage.current === page) { // Only log if spent more than 1 second and it's the current page
        analyticsService.logTimeSpent(currentPage.current, timeSpent);
      }
    };
  }, [location.pathname]);

  // Track clicks
  const trackClick = (element, page = location.pathname) => {
    analyticsService.logClick(element, page);
  };

  return { trackClick };
}; 