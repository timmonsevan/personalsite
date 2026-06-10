import "./MtgCard.css";
import { useState } from "react";

function MtgCard() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/mtg-random-card`
      );
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        setImageAlt("Random MTG card selected: " + data.name);
        setIsVisible(true);
        setHasError(false);
      } else {
        throw new Error("No image returned");
      }
    } catch {
      setIsVisible(false);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div title="Random MTG Card" className="content-container">
      <h2>Random MTG Card</h2>
      <button className="btn-accent" onClick={handleClick} disabled={loading}>
        Draw a card!
      </button>
      <div className="mtg-card-display">
        {isVisible && <img src={imageUrl} alt={imageAlt} />}
        {hasError && <p>Could not load card. Try again.</p>}
      </div>
    </div>
  );
}

export default MtgCard;
