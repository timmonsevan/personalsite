import './Header.css'

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
                src="/assets/images/home_app_icon.png"
                alt="Home Icon"
                className="icon"
                width="200"
                height="200"
              />
              <a href="/">Home</a>
            </button>
          </div>
          <div className="resume">
            <button className="btn-accent nav-link-btn">
              <img
                src="/assets/images/document_app_icon.png"
                alt="Document Icon"
                className="icon"
                width="200"
                height="200"
              />
              <a href="/resume">Resume</a>
            </button>
          </div>
          <div className="linkedin">
            <button className="btn-accent nav-link-btn">
              <img
                src="/assets/images/linkedin_app_icon.png"
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
                src="/assets/images/github_app_icon.png"
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
                src="/assets/images/settings_app_icon.png"
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
