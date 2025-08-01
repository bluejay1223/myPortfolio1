import { useState } from 'react';
import './AdminAuth.css';

const AdminAuth = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // In a real application, you would validate against a secure backend
  // For demo purposes, using a simple password check
  const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_authenticated', 'true');
      onAuthSuccess();
    } else {
      setError('Invalid password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <h2>Admin Access</h2>
        <p>Enter admin password to access analytics dashboard</p>
        
        <form onSubmit={handleSubmit} className="admin-auth-form">
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading || !password}
            className="auth-button"
          >
            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth; 