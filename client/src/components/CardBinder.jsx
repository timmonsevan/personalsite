import "./CardBinder.css";
import { useEffect, useState } from "react";
import { getVisitorId } from "../utils/visitorId";

function CardBinder({ refreshTrigger }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchBinder() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL ?? ""}/api/binder`,
          { headers: { "X-Visitor-Id": getVisitorId() } },
        );
        if (!res.ok) throw new Error("Failed to fetch binder");
        const data = await res.json();
        setCards(data.cards);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchBinder();
  }, [refreshTrigger]);

  const handleRemove = async (cardId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/binder/${cardId}`,
        { method: "DELETE", headers: { "X-Visitor-Id": getVisitorId() } },
      );
      if (!res.ok) throw new Error("Failed to remove card");
      setCards((current) => current.filter((card) => card.id !== cardId));
    } catch {
      setHasError(true);
    }
  };

  return (
    <div title="Card Binder" className="content-container">
      <h2>Your Card Binder</h2>
      {loading && <p>Loading your binder...</p>}
      {hasError && <p>Something went wrong loading your binder.</p>}
      {!loading && !hasError && cards.length === 0 && (
        <p>No cards saved yet. Draw a card and save it to your binder!</p>
      )}
      <div className="binder-grid">
        {cards.map((card) => (
          <div className="binder-card" key={card.id}>
            <img src={card.image_url} alt={card.name} />
            <p className="binder-card-name">{card.name}</p>
            <button
              className="btn-accent"
              onClick={() => handleRemove(card.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardBinder;
