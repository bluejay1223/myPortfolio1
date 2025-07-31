import './SectionPage.css';
import { Link } from 'react-router-dom';

export default function ExperienceProjects() {
  return (
    <div className="section-page">
      <Link to="/" className="back-home-btn">← Home</Link>
      <h2>Experience & Projects</h2>
      <div className="exp-proj-columns">
        <div className="exp-list exp-col">
          <div className="exp-item">
            <h3>Undergraduate Teaching Assistant <span style={{fontWeight:400}}>(Aug 2023 – July 2024)</span></h3>
            <p>North Carolina State University – Raleigh, NC</p>
            <ul>
              <li>Assisted in teaching in the course CSC 116: Introduction to Computing – Java</li>
              <li>Managed classroom of 40 - 50 students and assisted with questions regarding lecture, labs or projects</li>
              <li>Graded projects, assignments, and exams</li>
              <li>Held office hours and piazza on a weekly basis to answer questions on course material</li>
              <li>Answered questions via email or in person within 24 hours</li>
            </ul>
          </div>
          <div className="exp-item">
            <h3>Facility Operations Assistant <span style={{fontWeight:400}}>(Jan 2023 – May 2023)</span></h3>
            <p>North Carolina State University – Raleigh, NC</p>
            <ul>
              <li>Managed recreation equipment and assisted users for technical issues during the service</li>
              <li>Cooperated with team members for equipment set up and providing accurate information for exercise class and events</li>
              <li>Responded to emergency situations and adhered to established protocols including pre and post incident procedures</li>
            </ul>
          </div>
          <div className="exp-item">
            <h3>Media Team Vice President <span style={{fontWeight:400}}>(Aug 2021 ‐ Current)</span></h3>
            <p>Harvesters Church ‐ Cary, NC</p>
            <ul>
              <li>Participated on the weekly sermon by making and adjusting slides, live streaming, voices, and record the video</li>
              <li>Managed in checking sound equipment and computers and collaborated with chorus for technical help</li>
            </ul>
          </div>
        </div>
        <div className="exp-list proj-col">
          <div className="exp-item">
            <h3>DES Algorithm Project</h3>
            <p>CSC 230 Systems Programming | Language: C | Tools: Eclipse, JUnit, Git</p>
            <ul>
              <li>Built encode and decode programs to convert binary files to/from base64 format, replicating core UNIX functionality.</li>
              <li>Designed modular components (filebuffer, state24) for byte array management and 6-bit encoding logic.</li>
              <li>Wrote unit tests and used Valgrind to ensure memory safety and no resource leaks.</li>
              <li>Automated builds with a Makefile; handled edge cases with proper error reporting and validation.</li>
              <li>Github link for the project: <a href="https://github.com/taeyoonkim/DES-Algorithm-Project" target="_blank" rel="noopener noreferrer">https://github.com/taeyoonkim/DES-Algorithm-Project</a></li>
            </ul>
          </div>
          <div className="exp-item">
            <h3>WolfScheduler – Java Scheduling Application</h3>
            <p>CSC 216 Software Development Fundamentals | Language: Java | Tools: Eclipse, JUnit, Git</p>
            <ul>
              <li>Developed a course and event scheduling application allowing students to build and export custom class schedules.</li>
              <li>Implemented core features including loading validated course data from file, adding/removing courses and events, conflict detection, and exporting schedules to text.</li>
              <li>Designed user-facing functionality using modular use-case-driven architecture: rename/reset schedule, view course details, handle schedule conflicts, and validate inputs (time, days, instructor ID, etc.).</li>
              <li>Ensured robust input handling with comprehensive error feedback (e.g., invalid records, missing files, time conflicts).</li>
              <li>Tested functionality extensively using JUnit and followed object-oriented best practices throughout development.</li>
              <li>Github link for the project: <a href="https://github.com/taeyoonkim/DES-Algorithm-Project" target="_blank" rel="noopener noreferrer">https://github.com/taeyoonkim/DES-Algorithm-Project</a></li>
            </ul>
          </div>
          <div className="exp-item">
            <h3>Synchronization Project</h3>
            <p>CSC 246 Operating Systems | Language: C, Java | Tools: GCC, GDB, Valgrind, Make</p>
            <ul>
              <li>Simulated a multi-threaded kitchen where chef threads request and release access to limited shared appliances (e.g., stoves, ovens).</li>
              <li>Implemented and compared multiple synchronization strategies to manage resource contention.</li>
              <li>Ensured fairness and avoided deadlock by designing monitors that queued chef requests and handled concurrent access correctly.</li>
              <li>Used stress testing and Valgrind to verify memory safety, thread correctness, and system performance under high contention.</li>
              <li>Github link for the project: <a href="https://github.com/taeyoonkim/DES-Algorithm-Project" target="_blank" rel="noopener noreferrer">https://github.com/taeyoonkim/DES-Algorithm-Project</a></li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
} 