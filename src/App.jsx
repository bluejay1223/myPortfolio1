import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import AboutMe from './pages/AboutMe';
import Education from './pages/Education';
import ExperienceProjects from './pages/ExperienceProjects';
import Favorites from './pages/Favorites';
import Places from './pages/Places';

const SECTIONS = [
  { label: 'About Me', path: '/about' },
  { label: 'Education', path: '/education' },
  { label: 'Experience & Projects', path: '/experience-projects' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Places', path: '/places' },
];

const SEARCH_SECTIONS = [
  {
    label: 'About Me',
    path: '/about',
    keywords: ['bio', 'introduction', 'profile', 'Taeyoon', 'Kim', 'UNC', 'Cary', 'Data Science', 'student'],
  },
  {
    label: 'Education',
    path: '/education',
    keywords: [
      'school', 'university', 'degree', 'study', 'UNC', 'Chapel Hill', 'NCSU', 'North Carolina State', 'Panther Creek', 'GPA', 'Data Science', 'Computer Science', 'Dean\'s list', 'Cary', 'Raleigh', 'High School',
    ],
  },
  {
    label: 'Experience & Projects',
    path: '/experience-projects',
    keywords: [
      'work', 'job', 'project', 'internship', 'research', 'Teaching Assistant', 'Media Team', 'WolfScheduler', 'DES', 'Networking', 'Java', 'C', 'Harvesters Church', 'course scheduling', 'encryption', 'TCP', 'UDP',
    ],
  },
  {
    label: 'Favorites',
    path: '/favorites',
    keywords: [
      'like', 'hobby', 'interest', 'favorite', 'UNC', 'music', 'food', 'travel', 'basketball', 'coding',
    ],
  },
  {
    label: 'Places',
    path: '/places',
    keywords: [
      'location', 'travel', 'city', 'country', 'Cary', 'Raleigh', 'Chapel Hill', 'North Carolina', 'USA', 'UNC',
    ],
  },
];

function DropdownMenu() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown-menu-container" onMouseLeave={() => setOpen(false)}>
      <button className="dropdown-toggle" onClick={() => setOpen((v) => !v)}>
        ☰
      </button>
      {open && (
        <ul className="dropdown-list">
          {SECTIONS.filter(s => s.path !== location.pathname).map(s => (
            <li key={s.path}>
              <Link to={s.path} className="dropdown-link">{s.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Header() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const results =
    query.trim() === ''
      ? []
      : SEARCH_SECTIONS.flatMap(section =>
          section.keywords
            .filter(k => k.toLowerCase().includes(query.toLowerCase()))
            .map(k => ({ section, keyword: k }))
        );
  const isHome = location.pathname === '/' || location.pathname === '/myPortfolio1/' || location.pathname === '/myPortfolio1';
  
  return (
    <header className="site-header">
      <div className={isHome ? 'header-row home-header-row' : 'header-row'}>
        {isHome ? <h1>Taeyoon Kim</h1> : <div />}
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map(({ section, keyword }, idx) => (
                <li key={section.path + keyword + idx}>
                  <button
                    className="search-result-link"
                    onClick={() => {
                      setQuery('');
                      navigate(section.path);
                    }}
                  >
                    {section.label} <span className="search-keyword">({keyword})</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!isHome && <DropdownMenu />}
      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="main-menu">
      {SECTIONS.map((block) => (
        <Link className="menu-block" to={block.path} key={block.label}>
          {block.label}
        </Link>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myPortfolio1/" element={<Home />} />
        <Route path="/myPortfolio1" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/education" element={<Education />} />
        <Route path="/experience-projects" element={<ExperienceProjects />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/places" element={<Places />} />
      </Routes>
    </>
  );
}

export default App;
