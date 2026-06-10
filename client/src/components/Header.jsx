import { Link } from 'react-router-dom'
import './Header.css'
import homeIcon from '../assets/icons/home_app_icon.png'
import documentIcon from '../assets/icons/document_app_icon.png'
import linkedinIcon from '../assets/icons/linkedin_app_icon.png'
import githubIcon from '../assets/icons/github_app_icon.png'
import settingsIcon from '../assets/icons/settings_app_icon.png'

function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">Evan Timmons</div>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          ☰
        </button>
        <div className="nav-links">
          <div className="home">
            <button className="btn-accent nav-link-btn">
              <img
                src={homeIcon}
                alt="Home Icon"
                className="icon"
                width="200"
                height="200"
              />
              <Link to="/">Home</Link>
            </button>
          </div>
          <div className="resume">
            <button className="btn-accent nav-link-btn">
              <img
                src={documentIcon}
                alt="Document Icon"
                className="icon"
                width="200"
                height="200"
              />
              <Link to="/resume">Resume</Link>
            </button>
          </div>
          <div className="linkedin">
            <button className="btn-accent nav-link-btn">
              <img
                src={linkedinIcon}
                alt="LinkedIn Icon"
                className="icon"
                width="200"
                height="200"
              />
              <a
                href="https://www.linkedin.com/in/timmonsevan/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </button>
          </div>
          <div className="github">
            <button className="btn-accent nav-link-btn">
              <img
                src={githubIcon}
                alt="GitHub Icon"
                className="icon"
                width="200"
                height="200"
              />
              <a
                href="https://www.github.com/timmonsevan"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </button>
          </div>
          <div className="settings-dropdown">
            <button
              className="btn-accent dropdown-trigger"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={settingsIcon}
                alt="Settings Icon"
                className="icon"
                width="2295"
                height="2295"
              />
              Settings ▾
            </button>
            <div className="dropdown-menu">
              <button
                className="btn-accent dark-theme-toggle"
                aria-label="Toggle dark mode"
              >
                Dark Mode
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
