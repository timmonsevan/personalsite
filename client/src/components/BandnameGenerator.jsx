import "./BandnameGenerator.css";
import names from "../data/names.json";
import { useState } from "react";

function getRandomName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomBandName(names) {
  const firstName = getRandomName(names);
  const rest = names.filter((n) => n !== firstName);
  const secondName = getRandomName(rest);

  return [firstName, secondName];
}

function BandnameGenerator() {
  const [bandName, setBandName] = useState(["", ""]);
  const handleClick = () => {
    setBandName(getRandomBandName(names));
  };

  return (
    <div title="Doom Bandname Generator" className="content-container">
      <h2>Doom Bandname Generator</h2>
      <button className="btn-accent" onClick={handleClick}>
        Generate bandname!
      </button>
      <div className="bandname-container">
        <h3>{bandName[0]}</h3>
        <h3>{bandName[1]}</h3>
      </div>
    </div>
  );
}

export default BandnameGenerator;
