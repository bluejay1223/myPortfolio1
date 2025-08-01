import { useState, useEffect } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { analyticsService, supabase } from '../lib/supabase';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7); // days
  const [error, setError] = useState(null);

  // Add demo data for testing
  const addDemoData = async () => {
    try {
      const demoData = [
        // Page views
        { page: '/', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { page: '/about', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { page: '/education', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { page: '/experience-projects', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { page: '/favorites', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
        { page: '/places', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
        { page: '/', timestamp: new Date().toISOString(), session_id: 'demo4' },
      ];

      const timeSpentData = [
        { page: '/', time_spent: 45000, timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { page: '/about', time_spent: 120000, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { page: '/education', time_spent: 80000, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { page: '/experience-projects', time_spent: 180000, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { page: '/favorites', time_spent: 60000, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
        { page: '/places', time_spent: 90000, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
      ];

      const clickEventsData = [
        { element: 'home-menu-about-me', page: '/', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { element: 'nav-education', page: '/about', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo1' },
        { element: 'home-menu-experience-projects', page: '/', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { element: 'dropdown-toggle', page: '/education', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo2' },
        { element: 'search-result-favorites', page: '/', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
        { element: 'home-menu-places', page: '/', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), session_id: 'demo3' },
      ];

      // Insert demo data into Supabase
      for (const view of demoData) {
        await analyticsService.logPageView(view.page, null);
      }
      
      for (const timeData of timeSpentData) {
        await analyticsService.logTimeSpent(timeData.page, timeData.time_spent, null);
      }
      
      for (const clickData of clickEventsData) {
        await analyticsService.logClick(clickData.element, clickData.page, null);
      }
      
      // Reload analytics
      loadAnalytics();
    } catch (error) {
      console.error('Error adding demo data:', error);
      setError('Failed to add demo data. Please check your Supabase connection.');
    }
  };

  // Reset all analytics data
  const resetAllData = async () => {
    if (window.confirm('Are you sure you want to delete all analytics data? This action cannot be undone.')) {
      try {
        setLoading(true);
        
        // Delete all data from Supabase tables
        const { error: pageViewsError } = await supabase
          .from('page_views')
          .delete()
          .neq('id', 0); // Delete all records
        
        const { error: timeSpentError } = await supabase
          .from('time_spent')
          .delete()
          .neq('id', 0); // Delete all records
        
        const { error: clickEventsError } = await supabase
          .from('click_events')
          .delete()
          .neq('id', 0); // Delete all records

        if (pageViewsError || timeSpentError || clickEventsError) {
          throw new Error('Failed to delete data from one or more tables');
        }

        // Clear session storage
        sessionStorage.removeItem('analytics_session_id');
        
        // Reload analytics to show empty state
        loadAnalytics();
        
        setError(null);
      } catch (error) {
        console.error('Error resetting data:', error);
        setError('Failed to reset analytics data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const endDate = endOfDay(new Date()).toISOString();
      const startDate = startOfDay(subDays(new Date(), dateRange)).toISOString();
      
      const data = await analyticsService.getAnalytics(startDate, endDate);
      setAnalyticsData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const processPageViews = () => {
    if (!analyticsData?.pageViews) return { labels: [], data: [] };
    
    const pageCounts = analyticsData.pageViews
      .filter(view => view.page !== '/analytics') // Exclude analytics page
      .reduce((acc, view) => {
        const page = view.page === '/' ? 'Home' : view.page.replace('/', '').replace('-', ' ');
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});

    return {
      labels: Object.keys(pageCounts),
      data: Object.values(pageCounts)
    };
  };

  const processTimeSpent = () => {
    if (!analyticsData?.timeSpent) return { labels: [], data: [] };
    
    const pageTime = analyticsData.timeSpent
      .filter(record => record.page !== '/analytics') // Exclude analytics page
      .reduce((acc, record) => {
        const page = record.page === '/' ? 'Home' : record.page.replace('/', '').replace('-', ' ');
        if (!acc[page]) acc[page] = [];
        acc[page].push(record.time_spent);
        return acc;
      }, {});

    const avgTime = Object.entries(pageTime).map(([page, times]) => ({
      page,
      avgTime: times.reduce((sum, time) => sum + time, 0) / times.length / 1000 // Convert to seconds
    }));

    return {
      labels: avgTime.map(item => item.page),
      data: avgTime.map(item => Math.round(item.avgTime))
    };
  };

  const processClickEvents = () => {
    if (!analyticsData?.clickEvents) return { labels: [], data: [] };
    
    const clickCounts = analyticsData.clickEvents
      .filter(click => click.page !== '/analytics') // Exclude analytics page clicks
      .reduce((acc, click) => {
        acc[click.element] = (acc[click.element] || 0) + 1;
        return acc;
      }, {});

    const sortedClicks = Object.entries(clickCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // Top 10 elements

    return {
      labels: sortedClicks.map(([element]) => element),
      data: sortedClicks.map(([, count]) => count)
    };
  };

  const processDailyViews = () => {
    if (!analyticsData?.pageViews) return { labels: [], data: [] };
    
    const dailyCounts = analyticsData.pageViews
      .filter(view => view.page !== '/analytics') // Exclude analytics page
      .reduce((acc, view) => {
        const date = format(new Date(view.timestamp), 'MMM dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    return {
      labels: Object.keys(dailyCounts),
      data: Object.values(dailyCounts)
    };
  };

  const processTimestampLog = () => {
    if (!analyticsData?.pageViews) return [];
    
    // Get the first entry for each session (when they first entered the website)
    const firstEntries = analyticsData.pageViews
      .filter(view => view.page !== '/analytics') // Exclude analytics page
      .reduce((acc, view) => {
        if (!acc[view.session_id] || new Date(view.timestamp) < new Date(acc[view.session_id].timestamp)) {
          acc[view.session_id] = view;
        }
        return acc;
      }, {});

    return Object.values(firstEntries)
      .map(view => ({
        ...view,
        formattedTime: format(new Date(view.timestamp), 'MMM dd, yyyy HH:mm:ss'),
        pageName: view.page === '/' ? 'Home' : view.page.replace('/', '').replace('-', ' ')
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Most recent first
      .slice(0, 50); // Show last 50 entries
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error">{error}</div>
        <button onClick={loadAnalytics} className="retry-btn">Retry</button>
      </div>
    );
  }

  const pageViews = processPageViews();
  const timeSpent = processTimeSpent();
  const clickEvents = processClickEvents();
  const dailyViews = processDailyViews();
  const timestampLog = processTimestampLog();

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <div className="header-controls">
          <div className="date-range-selector">
            <label>Date Range: </label>
            <select value={dateRange} onChange={(e) => setDateRange(Number(e.target.value))}>
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
          <button onClick={addDemoData} className="demo-data-btn">
            Add Demo Data
          </button>
          <button onClick={resetAllData} className="reset-data-btn">
            Reset All Data
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Page Views</h3>
            <p className="summary-number">
              {analyticsData?.pageViews?.filter(view => view.page !== '/analytics').length || 0}
            </p>
          </div>
          <div className="summary-card">
            <h3>Total Sessions</h3>
            <p className="summary-number">
              {new Set(analyticsData?.pageViews?.filter(view => view.page !== '/analytics').map(v => v.session_id) || []).size}
            </p>
          </div>
          <div className="summary-card">
            <h3>Avg Time on Site</h3>
            <p className="summary-number">
              {analyticsData?.timeSpent?.filter(record => record.page !== '/analytics').length > 0 
                ? Math.round(analyticsData.timeSpent.filter(record => record.page !== '/analytics').reduce((sum, t) => sum + t.time_spent, 0) / analyticsData.timeSpent.filter(record => record.page !== '/analytics').length / 1000)
                : 0}s
            </p>
          </div>
          <div className="summary-card">
            <h3>Total Clicks</h3>
            <p className="summary-number">
              {analyticsData?.clickEvents?.filter(click => click.page !== '/analytics').length || 0}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="chart-container">
          <h2>Daily Page Views</h2>
          <Line
            data={{
              labels: dailyViews.labels,
              datasets: [{
                label: 'Page Views',
                data: dailyViews.data,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h2>Page Views by Section</h2>
          <Bar
            data={{
              labels: pageViews.labels,
              datasets: [{
                label: 'Page Views',
                data: pageViews.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                ],
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h2>Average Time Spent (seconds)</h2>
          <Bar
            data={{
              labels: timeSpent.labels,
              datasets: [{
                label: 'Average Time (seconds)',
                data: timeSpent.data,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h2>Most Clicked Elements</h2>
          <Doughnut
            data={{
              labels: clickEvents.labels,
              datasets: [{
                data: clickEvents.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                ],
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: false }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h2>Website Entry Log</h2>
          <div className="timestamp-log">
            {timestampLog.length > 0 ? (
              <div className="log-table">
                <div className="log-header">
                  <span className="log-time">Timestamp</span>
                  <span className="log-page">Page</span>
                  <span className="log-session">Session ID</span>
                </div>
                <div className="log-entries">
                  {timestampLog.map((entry, index) => (
                    <div key={entry.id || index} className="log-entry">
                      <span className="log-time">{entry.formattedTime}</span>
                      <span className="log-page">{entry.pageName}</span>
                      <span className="log-session">{entry.session_id.substring(0, 8)}...</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-data">No entries recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 