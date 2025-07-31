import './SectionPage.css';
import { Link } from 'react-router-dom';
import MePhoto from '../../image/me.jpeg';

export default function AboutMe() {
  return (
    <div className="section-page">
      <Link to="/" className="back-home-btn">← Home</Link>
      <div className="aboutme-content">
        <img src={MePhoto} alt="Taeyoon Kim" className="aboutme-photo" />
        <div>
          <h2>About Me</h2>
          <p>Hello! I’m Taeyoon Kim, a Computer Science student at UNC Chapel Hill. I love coding, learning new things, and exploring the intersection of technology and creativity.</p>
          <ul className="aboutme-facts">
            <li> I enjoy music and play the bass.</li>
            <li> Basketball is my favorite sport.</li>
            <li> I love traveling and discovering new places.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
  