import "./MtgCard.css";
import { useState } from "react";
import { getVisitorId } from "../utils/visitorId";

function MtgCard({ onSaved }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

  const handleClick = async () => {
    setLoading(true);
    setSaveStatus("idle");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/mtg-random-card`,
      );
      const data = await res.json();
      if (data.imageUrl) {
        setCard(data);
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

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/binder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Visitor-Id": getVisitorId(),
          },
          body: JSON.stringify(card),
        },
      );
      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("saved");
      onSaved?.();
    } catch {
      setSaveStatus("error");
    }
  };

  return (
    <div title="Random MTG Card" className="content-container">
      <h2>Random MTG Card</h2>
      <button className="btn-accent" onClick={handleClick} disabled={loading}>
        {loading ? "Drawing..." : "Draw a card!"}
      </button>
      <div className="mtg-card-display">
        {isVisible && (
          <>
            <img
              src={card.imageUrl}
              alt={"Random MTG card selected: " + card.name}
            />
            <button
              className="btn-accent"
              onClick={handleSave}
              disabled={saveStatus === "saving" || saveStatus === "saved"}
            >
              {saveStatus === "saved"
                ? "Saved!"
                : saveStatus === "saving"
                  ? "Saving..."
                  : "Save to Binder"}
            </button>
            {saveStatus === "error" && (
              <p>Could not save card. Try again.</p>
            )}
          </>
        )}
        {hasError && <p>Could not load card. Try again.</p>}
      </div>
    </div>
  );
}

export default MtgCard;
