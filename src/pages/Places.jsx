import './SectionPage.css';
import { Link } from 'react-router-dom';

export default function Places() {
  return (
    <div className="section-page">
      <Link to="/" className="back-home-btn">← Home</Link>
      <h2>Places</h2>
      <div className="places-list">
        <div className="place-item">🏠 Cary, NC (Home)</div>
        <div className="place-item">🎓 Chapel Hill, NC (UNC)</div>
        <div className="place-item">🏫 Raleigh, NC (NCSU)</div>
        <div className="place-item">🌆 New York City, NY</div>
        <div className="place-item">🌏 Seoul, South Korea</div>
      </div>
    </div>
  );
} 