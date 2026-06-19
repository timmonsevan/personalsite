import "./ProjectsPage.css";
import { Link } from "react-router-dom";

function ProjectsPage() {
  return (
    <div id="projects-page" className="panel">
      <ul id="projects-list">
        <li id="mtg-project" className="project-item">
          <h2>MTG Card Binder</h2>
          <Link to="/projects/mtg" className="btn-accent">
            MTG Binder
          </Link>
        </li>
        <li id="nn-visualizer-project" className="project-item">
          <h2>Neural Network Visualizer</h2>
          <p className="widget-intro">
            Follow this link to see a Neural Network Visualizer/Digit Recognizer
            I built in Python.
          </p>
          <Link to="/projects/nn-visualizer" className="btn-accent">
            NN Visualizer
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProjectsPage;
