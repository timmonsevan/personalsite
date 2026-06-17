import "./HomePage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MtgCard from "../components/MtgCard";
import CardBinder from "../components/CardBinder";

function HomePage() {
  const [binderVersion, setBinderVersion] = useState(0);

  return (
    <div id="home-page" className="panel">
      <h1>Hi! I'm Evan.</h1>
      <img
        src="/assets/images/profile_pic.jpg"
        alt="Me on the Buckeye Trail"
        className="profile-photo"
        width="616"
        height="896"
        loading="lazy"
      />
      <p className="tagline">I'm a programmer.</p>
      <p className="tagline">I'm a musician.</p>
      <video
        controls
        playsInline
        preload="metadata"
        poster="/assets/images/stormy_monday_poster.jpg"
        aria-label="Stormy Monday"
      >
        <source src="/assets/media/stormy_monday_small.mp4" type="video/mp4" />
        <p>Your browser doesn't support HTML video.</p>
      </video>
      <p className="bio">
        I love to travel, to share good food, and to spend time with my family.
      </p>
      <p className="widget-intro">
        I love playing Magic: The Gathering with my friends. The artwork on the
        cards is what drew me into the game. Click this button to draw a random
        MTG card and see if the art draws you in, too.
      </p>
      <MtgCard onSaved={() => setBinderVersion((v) => v + 1)} />
      <p className="widget-intro">
        Found a card you like? Save it to your binder below and it'll be here
        next time you visit.
      </p>
      <CardBinder refreshTrigger={binderVersion} />
      <p className="widget-intro">
        Follow this link to see a Neural Network Visualizer/Digit Recognizer I
        built in Python.
      </p>
      <button className="btn-accent">
        <Link to="/nn-visualizer">Neural Network Visualizer</Link>
      </button>
    </div>
  );
}

export default HomePage;
