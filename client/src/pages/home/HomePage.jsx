import "./HomePage.css";

function HomePage() {
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
    </div>
  );
}

export default HomePage;
