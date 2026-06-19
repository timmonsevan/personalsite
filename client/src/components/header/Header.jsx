import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Header.css";
import ClockWidget from "../clock/ClockWidget";
import homeIcon from "../../assets/icons/home_app_icon.png";
import documentIcon from "../../assets/icons/document_app_icon.png";
import linkedinIcon from "../../assets/icons/linkedin_app_icon.png";
import githubIcon from "../../assets/icons/github_app_icon.png";
import settingsIcon from "../../assets/icons/settings_app_icon.png";
import projectsIcon from "../../assets/icons/projects_app_icon.png";

function Header() {
  const dropdownRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedTheme || (systemPrefersDark ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsScrolled((wasScrolled) =>
        wasScrolled ? scrollY > 10 : scrollY > 60,
      );
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <nav className="panel">
        <ClockWidget collapsed={isScrolled} />
        <div className="navbar">
          <div className="logo">Evan Timmons</div>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((open) => !open)}
          >
            ☰
          </button>
          <div className={`nav-links${isNavOpen ? " open" : ""}`}>
            <div className="home">
              <Link to="/" className="btn-accent nav-link-btn">
                <img
                  src={homeIcon}
                  alt="Home Icon"
                  className="icon"
                  width="200"
                  height="200"
                />
                Home
              </Link>
            </div>
            <div className="resume">
              <Link to="/resume" className="btn-accent nav-link-btn">
                <img
                  src={documentIcon}
                  alt="Document Icon"
                  className="icon"
                  width="200"
                  height="200"
                />
                Resume
              </Link>
            </div>
            <div className="projects">
              <Link to="/projects" className="btn-accent nav-link-btn">
                <img
                  src={projectsIcon}
                  alt="Projects Icon"
                  className="icon"
                  width="200"
                  height="200"
                />
                Projects
              </Link>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/timmonsevan/"
                target="_blank"
                rel="noreferrer"
                className="btn-accent nav-link-btn"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn Icon"
                  className="icon"
                  width="200"
                  height="200"
                />
                LinkedIn
              </a>
            </div>
            <div className="github">
              <a
                href="https://www.github.com/timmonsevan"
                target="_blank"
                rel="noreferrer"
                className="btn-accent nav-link-btn"
              >
                <img
                  src={githubIcon}
                  alt="GitHub Icon"
                  className="icon"
                  width="200"
                  height="200"
                />
                GitHub
              </a>
            </div>
            <div className="settings-dropdown" ref={dropdownRef}>
              <button
                className="btn-accent dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((open) => !open)}
              >
                <img
                  src={settingsIcon}
                  alt="Settings Icon"
                  className="icon"
                  width="2295"
                  height="2295"
                />
                Settings {isDropdownOpen ? "▴" : "▾"}
              </button>
              <div className={`dropdown-menu${isDropdownOpen ? " open" : ""}`}>
                <button
                  className="btn-accent dark-theme-toggle"
                  aria-label="Toggle dark mode"
                  onClick={() =>
                    setTheme((current) =>
                      current === "dark" ? "light" : "dark",
                    )
                  }
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
