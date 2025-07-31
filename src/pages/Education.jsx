import './SectionPage.css';
import { Link } from 'react-router-dom';
import UNCLogo from '../../image/school/UNC.png';
import NCSULogo from '../../image/school/NCSU.png';
import PCHSLogo from '../../image/school/PCHS.jpg';

const schools = [
  {
    year: '2022',
    left: '0%',
    logo: PCHSLogo,
    alt: 'Panther Creek High School Logo',
    name: 'Panther Creek High School',
    info: (
      <>
        <strong>Panther Creek High School</strong>
        <div>High School Diploma (2022)</div>
        <div>GPA: 4.3</div>
      </>
    ),
  },
  {
    year: '2024',
    left: '46%',
    logo: NCSULogo,
    alt: 'NCSU Logo',
    name: 'North Carolina State University',
    info: (
      <>
        <strong>North Carolina State University</strong>
        <div>B.S. in Engineering - Computer Science (2022–2024)</div>
        <div>GPA: 3.8 | Dean’s List (All semesters)</div>
      </>
    ),
  },
  {
    year: 'Now',
    left: '95%',
    logo: UNCLogo,
    alt: 'UNC Chapel Hill Logo',
    name: 'UNC Chapel Hill',
    info: (
      <>
        <strong>UNC Chapel Hill</strong>
        <div>B.S. in Computer Science (2024–Current)</div>
        <div>GPA: 3.91 | Dean’s List (All semesters)</div>
      </>
    ),
  },
];

export default function Education() {
  return (
    <div className="section-page">
      <Link to="/" className="back-home-btn">← Home</Link>
      <h2>Education</h2>
      <div className="timeline-horizontal">
        <div className="timeline-years-horizontal">
          <span>2022</span>
          <span>2024</span>
          <span>Now</span>
        </div>
        <div className="timeline-line-horizontal animated-gradient"></div>
        <div className="timeline-dots-horizontal">
          {schools.map((school) => (
            <div
              className="timeline-dot-edu-horizontal"
              key={school.name}
              style={{ left: school.left }}
            >
              <img src={school.logo} alt={school.alt} className="school-logo timeline-logo-horizontal" />
              <div className="timeline-info-card-horizontal">{school.info}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 