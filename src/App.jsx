import { CheckCircle, MapPin, FileText, Sun, Moon, ExternalLink, Github, Linkedin, Mail, Phone, Send, X } from 'lucide-react'
import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react'
import './App.css'
import Profile from './assets/Profile.JPG'
import ProfileHover from './assets/sleeping.png'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sending, setSending] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm('service_5ws0nr9', 'template_wnhoqsb', form.current, 'bp7JCMhTAb3zw_2Nr')
      .then(() => {
        alert("Message sent! I'll get back to you soon.");
        setShowContactForm(false);
        setSending(false);
        form.current.reset();
      }, (error) => {
        alert("Failed to send: " + error.text);
        setSending(false);
      });
  };

  return (
    <div className={isDarkMode ? 'dark-wrapper dark' : 'dark-wrapper'}>

      {/* ── HERO ── */}
      <header id="hero">
        <div className="profile-container">

          {/* LEFT — dark photo panel */}
          <div className="hero-left">
            <div className="img-container">
              <img
                src={isDarkMode ? ProfileHover : Profile}
                alt="Jerico Sam Dollano"
                className="profile-img"
              />
            </div>
            <div className="hero-left-name">
              <h1 className="name">Jerico Sam Dollano</h1>
              <p className="hero-left-role">Front-End Developer · PM</p>
            </div>
          </div>

          {/* RIGHT — info panel */}
          <div className="hero-right">
            <div className="hero-right-top">
              <div className="name-verify">
                <CheckCircle size={17} className="verify-icon" />
                <span className="verified-label">Verified Profile</span>
              </div>
              <div className="toggle-container">
                <button
                  className="dark-mode-toggle"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  aria-label="Toggle Dark Mode"
                >
                  <div className={`slider ${isDarkMode ? 'active' : ''}`}>
                    {isDarkMode ? <Moon size={11} /> : <Sun size={11} />}
                  </div>
                </button>
              </div>
            </div>

            <div className="hero-meta">
              <p className="location"><MapPin size={13} /> Cebu City, Philippines</p>
              <div className="availability-badge">
                <span className="badge-dot" />
                Open to opportunities
              </div>
            </div>

            <div className="hero-divider" />

            <div className="hero-info-grid">
              <div className="hero-info-item">
                <span className="info-label">Degree</span>
                <span className="info-value">BS Information Technology</span>
              </div>
              <div className="hero-info-item">
                <span className="info-label">University</span>
                <span className="info-value">CIT — University</span>
              </div>
              <div className="hero-info-item">
                <span className="info-label">Current Role</span>
                <span className="info-value">Project Manager</span>
              </div>
              <div className="hero-info-item">
                <span className="info-label">Focus</span>
                <span className="info-value">Front-End Development</span>
              </div>
            </div>

            <div className="hero-divider" />

            <div className="contact-actions">
              <a
                href="/Dollano_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn"
                id="resume"
              >
                <FileText size={15} /> Resume
              </a>
              <button className="contact-btn" onClick={() => setShowContactForm(true)}>
                <Mail size={15} /> Email Me
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ── ABOUT & EXPERIENCE ── */}
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
              <div className="timeline-left">
                <div className="timeline-dot current" />
                <div className="timeline-line" />
              </div>
              <div>
                <div className="timeline-header">
                  <span className="job-title">Project Manager</span>
                  <span className="year">2026</span>
                </div>
                <p className="company">Andromeda Inc.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div>
                <div className="timeline-header">
                  <span className="job-title">BS Information Technology</span>
                  <span className="year">2025</span>
                </div>
                <p className="company">CIT — University</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div>
                <div className="timeline-header">
                  <span className="job-title">Hello World!</span>
                  <span className="year">2021</span>
                </div>
                <p className="company">Wrote my first line of code</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div>
                <div className="timeline-header">
                  <span className="job-title">Work Order Mgmt.</span>
                  <span className="year">2019</span>
                </div>
                <p className="company">Andromeda Inc.</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ── TECH STACK & PROJECTS ── */}
      <div className="grid-container">
        <section id="tech-stack" className="content-card">
          <h2>Tech Stack</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <div className="tags">
                <span>HTML</span><span>CSS</span><span>JavaScript</span><span>ReactJS</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Backend &amp; Database</h4>
              <div className="tags">
                <span>Spring Boot</span><span>MySQL</span><span>Supabase</span><span>Firebase</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Programming Languages</h4>
              <div className="tags">
                <span>Java</span><span>C++</span><span>JavaScript</span>
              </div>
            </div>
          </div>
        </section>

        <section id="project-showcase" className="content-card">
          <h2>Featured Projects</h2>
          <div className="projects-list">
            <div className="project-inner-card">
              <div className="project-status">Live Project</div>
              <h3>Elementopia</h3>
              <p>A gamified learning platform designed to make Chemistry more engaging for students.</p>
              <a href="https://elementopia.netlify.app/" target="_blank" rel="noreferrer" className="project-link">
                Visit Site <ExternalLink size={12} />
              </a>
            </div>

            <div className="project-inner-card">
              <div className="project-status">Live Project</div>
              <h3>Job Flow</h3>
              <p>A job tracker app to manage, organize, and monitor your applications in one place.</p>
              <a href="https://deployedjobflow.vercel.app/" target="_blank" rel="noreferrer" className="project-link">
                Visit Site <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── WHAT I'M LOOKING FOR (NEW SECTION) ── */}
      <div className="rec-row">
        <div className="content-card" style={{ marginBottom: 0 }}>
          <h2>What I'm Looking For</h2>
          <div className="rec-card-wrap">
            <div className="rec-card">
              <div className="rec-icon">🎨</div>
              <div className="rec-title">UI / Front-End Roles</div>
              <p className="rec-desc">Focused on building clean, responsive interfaces with React, CSS, and modern tooling.</p>
              <span className="rec-tag">React · CSS · JS</span>
            </div>
            <div className="rec-card">
              <div className="rec-icon">🤝</div>
              <div className="rec-title">Collaborative Teams</div>
              <p className="rec-desc">Thrives in cross-functional environments where design, dev, and business work closely together.</p>
              <span className="rec-tag">Agile · Scrum</span>
            </div>
            <div className="rec-card">
              <div className="rec-icon">📈</div>
              <div className="rec-title">Growth-Oriented Culture</div>
              <p className="rec-desc">Looking for a company that invests in learning and gives room to grow technically and professionally.</p>
              <span className="rec-tag">Mentorship · Learning</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer-card">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Jerico Sam Dollano</h3>
            <p>
              Front-End Developer based in Cebu, Philippines. Open to full-time roles, freelance, and collaboration.
            </p>
          </div>

          <nav className="footer-nav">
            <div className="footer-nav-label">Connect</div>
            <a href="https://github.com/JerichoSam" target="_blank" rel="noopener noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/jericho-sam-dollano-62265033b/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="mailto:jerichosamdollano@gmail.com">
              <Mail size={16} /> jerichosamdollano@gmail.com
            </a>
          </nav>
        </div>

        <div className="footer-bar">
          <p className="phone-line"><Phone size={12} /> 09995865667</p>
          <p>&copy; 2026 Jerico Sam Dollano · Built with React</p>
        </div>
      </footer>

      {/* ── EMAIL MODAL ── */}
      {showContactForm && (
        <div className="modal-backdrop" onClick={() => setShowContactForm(false)}>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="email-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <h3>Send a Message</h3>
              <p>I usually respond within 24 hours.</p>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowContactForm(false)}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="form-field">
                <label htmlFor="from_name">Full Name</label>
                <input id="from_name" type="text" name="from_name" placeholder="John Doe" required />
              </div>
              <div className="form-field">
                <label htmlFor="user_email">Email Address</label>
                <input id="user_email" type="email" name="user_email" placeholder="john@example.com" required />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Hi Jerico, I'd love to connect about..." required />
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowContactForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="send-btn" disabled={sending}>
                {sending ? 'Sending…' : <><Send size={14} /> Send Message</>}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}

export default App
