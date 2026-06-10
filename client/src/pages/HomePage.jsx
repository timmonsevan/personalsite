import "./HomePage.css";
import BandnameGenerator from "../components/BandnameGenerator";
import MtgCard from "../components/MtgCard";

function HomePage() {
  return (
    <div className="body-content-container panel">
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
      <video controls playsInline preload="metadata" aria-label="Stormy Monday">
        <source src="/assets/media/stormy_monday_small.mp4" type="video/mp4" />
        <p>Your browser doesn't support HTML video.</p>
      </video>
      <p className="bio">
        I love to travel, to share good food, and to spend time with my family.
      </p>
      <p className="widget-intro">
        I love doom metal, the blues and southern rock, to name a few genres.
        Doom metal bands always seem to have the same few nouns making up their
        bandnames, so I threw together a fun little bandname generator widget to
        get the ideas flowing!
      </p>
      <BandnameGenerator />
      <p className="widget-intro">
        I love playing Magic: The Gathering with my friends. The artwork on the
        cards is what drew me into the game. Click this button to draw a random
        MTG card and see if the art draws you in, too.
      </p>
      <MtgCard />
    </div>
  );
}

export default HomePage;
