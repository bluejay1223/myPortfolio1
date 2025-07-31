import './SectionPage.css';
import { Link } from 'react-router-dom';

export default function Favorites() {
  return (
    <div className="section-page">
      <Link to="/" className="back-home-btn">← Home</Link>
      <h2>Favorites</h2>
      <div className="favorites-list">
        <div className="favorite-item">🎵 Music: Piano, Lo-fi, K-pop</div>
        <div className="favorite-item">🏀 Sport: Basketball</div>
        <div className="favorite-item">🍣 Food: Sushi, Korean BBQ</div>
        <div className="favorite-item">💻 Hobby: Coding, building side projects</div>
        <div className="favorite-item">🌎 Travel: UNC, NYC, Seoul</div>
      </div>
    </div>
  );
} 