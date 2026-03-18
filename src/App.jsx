import { useState } from 'react'
import { CheckCircle, MapPin, FileText, Sun, Moon, ExternalLink, Github, Linkedin, Mail, Phone } from 'lucide-react'
import './App.css'
import Profile from './assets/Profile.JPG'
import ProfileHover from './assets/sleeping.png'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark-wrapper dark' : 'dark-wrapper'}>
      {/* HERO SECTION */}
      <header id="hero">
        <div className="profile-container">
          <div className="img-container">
            <img
              src={isDarkMode ? ProfileHover : Profile}
              alt="Jericho Sam Dollano"
              className="profile-img"
            />
          </div>

          <div className="profile-details">
            <div className="name-add">
              <h1 className='name'>
                Jericho Sam Dollano
                <CheckCircle size={22} className="verify-icon" />
              </h1>
              <p className="location">
                <MapPin size={16} /> Cebu City, Philippines
              </p>
            </div>
            <p className="role">Front End Developer / Project Manager</p>

            <div className="contact-actions">
              <a
                href="../public/Dollano_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn"
                id="resume"
                style={{ textDecoration: 'none' }} rs
              >
                <FileText size={18} /> Resume
              </a>
              <a
                href="mailto:jerichosamdollano@gmail.com"
                className="contact-btn"
                id="send-email"
                style={{ textDecoration: 'none' }}
              >
                <Mail size={18} /> Email Me
              </a>
            </div>
          </div>

          <div className="toggle-container">
            <button className='dark-mode-toggle' onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle Dark Mode">
              <div className={`slider ${isDarkMode ? 'active' : ''}`}>
                {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/*ABOUT & EXPERIENCE */}
      <main className="grid-container">
        <section id="about" className="content-card">
          <h2>About</h2>
          <p>
            I am a Bachelor of Science in Information Technology graduate from Cebu Institute of Technology, specializing in front-end development using HTML, CSS, JavaScript, and React.js. I also have experience with Java Spring Boot and databases such as MySQL, Supabase, and Firebase, along with programming in Java and C++.
          </p>

          <p>
            During my studies, I worked as a working student at Andromeda Inc. in Work Order Management, where I handled task scheduling, tracking, and coordination with technicians and stakeholders, helping improve workflow efficiency. I was recently promoted to Project Manager, further strengthening my leadership and organizational skills.
          </p>

          <p>
            Despite my current role, I am passionate about front-end development and eager to build a career creating intuitive and engaging user interfaces.
          </p>
        </section>

        <section id="experience" className="content-card">
          <h2>Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot current"></div>
              <div className="timeline-header">
                <span className="job-title">Project Manager</span>
                <span className="year">2026</span>
              </div>
              <p className="company">Andromeda Inc.</p>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-header">
                <span className="job-title">BS Information Technology</span>
                <span className="year">2025</span>
              </div>
              <p className="company">CIT - University</p>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-header">
                <span className="job-title">Hello World!.</span>
                <span className="year">2021</span>
              </div>
              <p className="company">Wrote my first line of code</p>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-header">
                <span className="job-title">Work Order Mgmt.</span>
                <span className="year">2019</span>
              </div>
              <p className="company">Andromeda Inc.</p>
            </div>
          </div>
        </section>
      </main>

      {/*TECH STACK & PROJECTS */}
      <div className="grid-container">
        <section id="tech-stack" className="content-card">
          <h2>Tech Stack</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <div className="tags">
                <span>HTML</span> <span>CSS</span> <span>JavaScript</span> <span>ReactJS</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Backend & DB</h4>
              <div className="tags">
                <span>Spring Boot</span> <span>MySQL</span> <span>Supabase</span> <span>Firebase</span>
              </div>
            </div>
          </div>
        </section>

        <section id="project-showcase" className="content-card">
          <h2>Featured Project</h2>
          <div className="project-inner-card">
            <div className="project-status">Live Project</div>
            <h3>Elementopia</h3>
            <p>A gamified learning platform for Chemistry students.</p>
            <a href="https://elementopia.netlify.app/" target="_blank" rel="noreferrer" className="project-link">
              Visit Site <ExternalLink size={14} />
            </a>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer-card">
  <div className="footer-links">
    {/* GitHub with exact logo */}
    <a 
      href="https://github.com/JerichoSam" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Github size={20} /> GitHub
    </a>

    {/* LinkedIn with exact logo */}
    <a 
      href="https://www.linkedin.com/in/jericho-sam-dollano-62265033b/" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Linkedin size={20} /> LinkedIn
    </a>

    {/* Email Link */}
    <a href="mailto:jerichosamdollano@gmail.com">
      <Mail size={20} /> Email
    </a>
  </div>

  <div className="footer-bottom">
    <p className="phone-line">
      <Phone size={14} /> 09995865667
    </p>
    <p>&copy; 2026 Jericho Sam Dollano. Built with React.</p>
  </div>
</footer>
    </div>
  )
}

export default App