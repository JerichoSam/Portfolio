import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import emailjs from '@emailjs/browser'
import {
  MapPin, FileText, Sun, Moon,
  ExternalLink, Github, Linkedin, Mail, Phone, Send, X
} from 'lucide-react'
import Profile from './assets/Profile.JPG'
import ProfileHover from './assets/sleeping.png'
import './App.css'

/* ─────────────────────────────────────────
   IT OBJECT 3D SCENE
───────────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas   = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 7

    const resize = () => {
      const hero = canvas.parentElement
      const w = hero.clientWidth, h = hero.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const accentColor = new THREE.Color('#c8f060')
    const dimColor    = new THREE.Color('#3a5a10')
    const group       = new THREE.Group()
    scene.add(group)

    const chipGeo = new THREE.BoxGeometry(0.5, 0.08, 0.5)
    const chipMat = new THREE.MeshBasicMaterial({ color: 0x0d2206 })
    const edgeMat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.7 })

    function addChip(x, y, z, scale = 1) {
      const geo  = chipGeo.clone()
      geo.scale(scale, scale, scale)
      const mesh = new THREE.Mesh(geo, chipMat)
      mesh.position.set(x, y, z)
      mesh.rotation.y = Math.random() * Math.PI
      group.add(mesh)
      const edges = new THREE.EdgesGeometry(geo)
      const line  = new THREE.LineSegments(edges, edgeMat)
      line.position.set(x, y, z)
      line.rotation.copy(mesh.rotation)
      group.add(line)
      return mesh
    }

    const nodeMat  = new THREE.MeshBasicMaterial({ color: accentColor })
    const nodeMat2 = new THREE.MeshBasicMaterial({ color: dimColor })

    function addNode(x, y, z, bright = true) {
      const geo  = new THREE.SphereGeometry(0.04, 8, 8)
      const mesh = new THREE.Mesh(geo, bright ? nodeMat : nodeMat2)
      mesh.position.set(x, y, z)
      group.add(mesh)
    }

    const traceMat  = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.4 })
    const traceMat2 = new THREE.LineBasicMaterial({ color: dimColor,    transparent: true, opacity: 0.25 })

    function addTrace(p1, p2, bright = true) {
      const pts  = [new THREE.Vector3(...p1), new THREE.Vector3(...p2)]
      const geo  = new THREE.BufferGeometry().setFromPoints(pts)
      const line = new THREE.Line(geo, bright ? traceMat : traceMat2)
      group.add(line)
    }

    function addRing(x, y, z, r = 0.3) {
      const geo  = new THREE.TorusGeometry(r, 0.015, 8, 32)
      const mat  = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.5 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.rotation.x = Math.PI / 2
      group.add(mesh)
      return mesh
    }

    function addCrystal(x, y, z, s = 0.22) {
      const geo      = new THREE.IcosahedronGeometry(s, 0)
      const mat      = new THREE.MeshBasicMaterial({ color: 0x0a1a04 })
      const mesh     = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      group.add(mesh)
      const edgeGeo  = new THREE.EdgesGeometry(geo)
      const edgeLine = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.85 })
      )
      edgeLine.position.set(x, y, z)
      group.add(edgeLine)
      return { mesh, edgeLine }
    }

    addChip(-1.8,  0.3,  0, 1.6)
    addChip( 2.1, -0.5,  0, 1.2)
    addChip(-0.3, -1.8, -1, 1.0)
    addChip( 0.8,  2.0, -1, 0.9)
    addChip(-2.5, -1.5, -2, 0.7)
    addChip( 3.0,  1.2, -2, 0.6)

    const crystals = [
      addCrystal(-3.2,  1.5, -0.5),
      addCrystal( 3.5, -0.8, -1),
      addCrystal( 0.2,  2.8, -0.5),
      addCrystal(-1.5, -2.5, -1),
      addCrystal( 2.5,  2.5, -2),
    ]

    const rings = [
      addRing(-1.8,  0.3, 0, 0.7),
      addRing( 2.1, -0.5, 0, 0.55),
      addRing( 0.0,  0.0, -3, 1.8),
    ]

    const tracePoints = [
      [[-2.5, 0.3, 0], [-1.8, 0.3, 0], true],
      [[-1.8, 0.3, 0], [-1.0, 0.3, 0], true],
      [[-1.0, 0.3, 0], [-0.3, 0.3, 0], false],
      [[-0.3, 0.3, 0], [ 0.5, 0.3, 0], false],
      [[ 0.5, 0.3, 0], [ 2.1, 0.3, 0], true],
      [[ 2.1, 0.3, 0], [ 3.2, 0.3, 0], false],
      [[-1.8, 0.3, 0], [-1.8,-0.8, 0], true],
      [[-1.8,-0.8, 0], [-1.8,-2.0, 0], false],
      [[ 2.1,-0.5, 0], [ 2.1,-1.5, 0], true],
      [[ 2.1,-1.5, 0], [ 2.1,-2.5, 0], false],
      [[-1.8, 0.3, 0], [-0.3,-1.8,-1], false],
      [[ 2.1,-0.5, 0], [ 0.8, 2.0,-1], false],
    ]

    tracePoints.forEach(([p1, p2, bright]) => {
      addTrace(p1, p2, bright)
      addNode(...p1, bright)
      addNode(...p2, bright)
    })

    for (let i = 0; i < 40; i++) {
      addNode(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4 - 1,
        Math.random() > 0.6
      )
    }

    let mx = 0, my = 0
    const onMouseMove = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 1.2
      my = (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf, t = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t  += 0.005
      group.rotation.y += 0.0015
      group.rotation.x  = Math.sin(t * 0.3) * 0.08
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.04
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      crystals.forEach((c, i) => {
        c.mesh.rotation.y     = t + i
        c.edgeLine.rotation.y = t + i
        c.mesh.position.y    += Math.sin(t + i * 1.3) * 0.001
        c.edgeLine.position.y = c.mesh.position.y
      })
      rings.forEach((r, i) => { r.rotation.z = t * (0.3 + i * 0.1) })
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="hero-canvas" />
}

/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const posRef  = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    const onMove = e => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }
    const onDown = () => ring.classList.add('pressed')
    const onUp   = () => ring.classList.remove('pressed')
    const onEnter = () => ring.classList.add('on-link')
    const onLeave = () => ring.classList.remove('on-link')

    const targets = document.querySelectorAll('a, button, .chip, .stag, .stat-card, .proj-card')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const follow = () => {
      raf = requestAnimationFrame(follow)
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12)
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
    }
    follow()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function App() {
  const [isDarkMode,      setIsDarkMode]      = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [sending,         setSending]         = useState(false)
  const [navScrolled,     setNavScrolled]     = useState(false)
  const form = useRef()

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sendEmail = e => {
    e.preventDefault()
    setSending(true)
    emailjs.sendForm('service_5ws0nr9', 'template_wnhoqsb', form.current, 'bp7JCMhTAb3zw_2Nr')
      .then(() => {
        alert("Message sent! I'll get back to you soon.")
        setShowContactForm(false)
        setSending(false)
        form.current.reset()
      }, err => {
        alert('Failed to send: ' + err.text)
        setSending(false)
      })
  }

  return (
    <div className={`wrapper${isDarkMode ? ' dark' : ''}`}>
      <CustomCursor />

      {/* ── NAV ── */}
      <nav className={`main-nav${navScrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">JSD</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
        </div>
        <button className="nav-cta" onClick={() => setShowContactForm(true)}>Contact</button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <HeroCanvas />
        <div className="hero-overlay" />

        {/* Profile card — anchored top-right inside hero */}
        <div className="hero-profile-card">
          <div className="profile-img-wrap">
            <img
              src={isDarkMode ? ProfileHover : Profile}
              alt="Jericho Sam Dollano"
              className="profile-img"
            />
          </div>
          <div className="profile-card-info">
            <div className="availability-badge">
              <span className="badge-dot" /> Open to opportunities
            </div>
            <div className="profile-meta">
              <MapPin size={11} /> Cebu City, Philippines
            </div>
          </div>
          <div className="dark-toggle-wrap">
            <button
              className="dark-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
            >
              <div className={`toggle-knob${isDarkMode ? ' active' : ''}`}>
                {isDarkMode ? <Moon size={10} /> : <Sun size={10} />}
              </div>
            </button>
          </div>
        </div>

        {/* Hero text — centered */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Front-End Developer · Project Manager · Cebu, PH
          </div>
          <h1 className="hero-name">
            Jericho<br />
            <em>Sam</em> Dollano
          </h1>
          <p className="hero-sub">
            Crafting interfaces that feel alive — with React, modern CSS,
            and a PM mindset that ships on time.
          </p>
          <div className="hero-btns">
            <a href="/Dollano_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FileText size={14} /> View Resume
            </a>
            <button className="btn-outline" onClick={() => setShowContactForm(true)}>
              <Mail size={14} /> Email Me
            </button>
            <a href="https://github.com/JerichoSam" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github size={14} />
            </a>
            <a href="https://www.linkedin.com/in/jericho-sam-dollano-62265033b/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-track"><div className="scroll-thumb" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-label"><span className="label-num">01</span> About</div>
        <div className="about-grid">
          <div className="reveal-left">
            <h2 className="section-headline">
              Crafting interfaces<br />that <em>actually</em> feel good
            </h2>
            <p className="body-text">
              I'm a BS Information Technology graduate from Cebu Institute of Technology,
              specializing in front-end development with HTML, CSS, JavaScript, and React.js.
              I also carry backend experience with Java Spring Boot and databases like MySQL,
              Supabase, and Firebase.
            </p>
            <p className="body-text">
              Currently working as <strong className="text-accent">Project Manager</strong> at Andromeda Inc.,
              where I handle task scheduling, workflow coordination, and stakeholder management —
              skills that make me a sharper collaborator and developer.
            </p>
            <p className="body-text">
              Despite the PM hat, my passion lies in front-end engineering —
              building the kind of UIs that make people stop and say <em>"wow."</em>
            </p>
            <div className="chip-row">
              {['React.js','JavaScript','CSS / SCSS','Java','Spring Boot','MySQL','Supabase','Firebase','C++','Agile'].map(c => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>

          <div className="about-right reveal-right">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Degree</span>
                <span className="info-value">BS Information Technology</span>
              </div>
              <div className="info-item">
                <span className="info-label">University</span>
                <span className="info-value">CIT — University</span>
              </div>
              <div className="info-item">
                <span className="info-label">Current Role</span>
                <span className="info-value">Project Manager</span>
              </div>
              <div className="info-item">
                <span className="info-label">Focus</span>
                <span className="info-value">Front-End Dev</span>
              </div>
            </div>
            <div className="stat-cards">
              <div className="stat-card reveal delay-1">
                <div className="stat-num">5<span>+</span></div>
                <div className="stat-desc">Years combined dev &amp; PM experience</div>
              </div>
              <div className="stat-card reveal delay-2">
                <div className="stat-num">2</div>
                <div className="stat-desc">Live projects in production</div>
              </div>
              <div className="stat-card reveal delay-3">
                <div className="stat-num">∞</div>
                <div className="stat-desc">Drive to learn &amp; ship</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section section-alt">
        <div className="section-label"><span className="label-num">02</span> Experience</div>
        <div className="exp-list">
          {[
            { year: '2026 — Now', title: 'Project Manager',          company: 'Andromeda Inc.',           tag: 'Current',   current: true },
            { year: '2025',       title: 'BS Information Technology', company: 'CIT — University, Cebu',   tag: 'Degree'               },
            { year: '2021',       title: 'Hello, World!',             company: 'Wrote first line of code', tag: 'Milestone'            },
            { year: '2019',       title: 'Work Order Management',     company: 'Andromeda Inc.',           tag: null                   },
          ].map((item, i) => (
            <div className={`exp-item reveal delay-${i}`} key={item.title}>
              <div className="exp-left">
                <div className={`exp-dot${item.current ? ' current' : ''}`} />
                <div className="exp-line" />
              </div>
              <div className="exp-year">{item.year}</div>
              <div className="exp-body">
                <div className="exp-title">{item.title}</div>
                <div className="exp-company">{item.company}</div>
                {item.tag && <span className={`exp-tag${item.current ? ' accent' : ''}`}>{item.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="stack" className="section">
        <div className="section-label"><span className="label-num">03</span> Tech Stack</div>
        <div className="stack-grid">
          {[
            { cat: 'Frontend',           tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js'] },
            { cat: 'Backend & Database', tags: ['Java Spring Boot', 'MySQL', 'Supabase', 'Firebase'] },
            { cat: 'Languages & Tools',  tags: ['Java', 'C++', 'JavaScript', 'Git', 'Figma'] },
          ].map((block, i) => (
            <div className={`stack-card reveal delay-${i}`} key={block.cat}>
              <div className="stack-cat">{block.cat}</div>
              <div className="stack-tags">
                {block.tags.map(t => <span className="stag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section section-alt">
        <div className="section-label"><span className="label-num">04</span> Featured Projects</div>
        <div className="projects-grid">
          <div className="proj-card reveal-left">
            <div className="proj-badge"><span className="live-dot" />Live Project</div>
            <h3 className="proj-name">Elementopia</h3>
            <p className="proj-desc">
              A gamified learning platform making Chemistry more engaging
              through interactive challenges and visual storytelling.
            </p>
            <a
              href="https://elementopia.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-link"
            >
              Visit Site <ExternalLink size={11} />
            </a>
          </div>
          <div className="proj-card reveal-right">
            <div className="proj-badge"><span className="live-dot" />Live Project</div>
            <h3 className="proj-name">Job Flow</h3>
            <p className="proj-desc">
              A streamlined job application tracker to manage, organize,
              and monitor every stage of your search in one clean dashboard.
            </p>
            <a
              href="https://deployedjobflow.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-link"
            >
              Visit Site <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* ── LOOKING FOR ── */}
      <section id="looking" className="section">
        <div className="section-label"><span className="label-num">05</span> What I'm Looking For</div>
        <div className="looking-grid">
          {[
            { icon: '🎨', title: 'UI / Front-End Roles',    desc: 'Clean, responsive interfaces with React, CSS, and modern tooling.',                         tag: 'React · CSS · JS'     },
            { icon: '🤝', title: 'Collaborative Teams',      desc: 'Cross-functional environments where design, dev, and business work closely.',                tag: 'Agile · Scrum'        },
            { icon: '📈', title: 'Growth-Oriented Culture', desc: 'A company that invests in learning and gives room to grow technically and professionally.', tag: 'Mentorship · Learning' },
          ].map((c, i) => (
            <div className={`look-card reveal delay-${i}`} key={c.title}>
              <div className="look-icon">{c.icon}</div>
              <div className="look-title">{c.title}</div>
              <p className="look-desc">{c.desc}</p>
              <span className="look-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-name">Jericho Sam Dollano</div>
            <p className="footer-sub">
              Front-End Developer based in Cebu, Philippines.
              Open to full-time roles, freelance, and collaboration.
            </p>
          </div>
          <nav className="footer-nav">
            <span className="footer-nav-label">Connect</span>
            <a href="https://github.com/JerichoSam" target="_blank" rel="noopener noreferrer">
              <Github size={14} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/jericho-sam-dollano-62265033b/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="mailto:jerichosamdollano@gmail.com">
              <Mail size={14} /> jerichosamdollano@gmail.com
            </a>
          </nav>
        </div>
        <div className="footer-bar">
          <span className="phone-line"><Phone size={11} /> 09995865667</span>
          <span>© 2026 Jericho Sam Dollano · Built with React + Three.js</span>
        </div>
      </footer>

      {/* ── EMAIL MODAL ── */}
      {showContactForm && (
        <div className="modal-backdrop" onClick={() => setShowContactForm(false)}>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="email-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <h3>Send a Message</h3>
                <p>I usually respond within 24 hours.</p>
              </div>
              <button type="button" className="modal-close" onClick={() => setShowContactForm(false)}>
                <X size={13} />
              </button>
            </div>
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
                <textarea id="message" name="message" placeholder="Hi Jericho, I'd love to connect about..." required />
              </div>
            </div>
            <div className="modal-foot">
              <button type="button" className="btn-cancel" onClick={() => setShowContactForm(false)}>Cancel</button>
              <button type="submit" className="btn-send" disabled={sending}>
                {sending ? 'Sending…' : <><Send size={13} /> Send Message</>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
