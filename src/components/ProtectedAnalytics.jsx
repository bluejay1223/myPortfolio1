import { useState, useEffect } from 'react';
import Analytics from '../pages/Analytics';
import AdminAuth from './AdminAuth';
import './ProtectedAnalytics.css';

const ProtectedAnalytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Analytics Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default ProtectedAnalytics; 