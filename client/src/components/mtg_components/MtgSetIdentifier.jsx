import "./MtgSetIdentifier.css";
import { useState } from "react";

function MtgSetIdentifier() {
  const [cardName, setCardName] = useState("");
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardName.trim()) return;

    setLoading(true);
    setError(null);
    setPrints([]);

    try {
      const cardRes = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/mtg-named-card?${new URLSearchParams({ name: cardName })}`,
      );
      if (!cardRes.ok) {
        throw new Error(
          cardRes.status === 404 ? "Card not found" : "Failed to fetch card",
        );
      }
      const card = await cardRes.json();

      const printsRes = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/mtg-card-prints?${new URLSearchParams({ oracleId: card.oracleId })}`,
      );
      if (!printsRes.ok) throw new Error("Failed to fetch printings");
      const data = await printsRes.json();
      setPrints(data.prints);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div title="MTG Set Identifier" className="panel">
      <h5>Enter an MTG Card Name to View All Sets Printed In</h5>
      <form className="set-identifier-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Card name (e.g. Lightning Bolt)"
        />
        <button className="btn-accent" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="set-identifier-error">{error}</p>}
      {!error && prints.length > 0 && (
        <ul className="print-list">
          {prints.map((print) => (
            <li key={print.id} className="print-list-item">
              <span className="print-set-name">
                {print.setName} ({print.setCode.toUpperCase()})
              </span>
              <span className="print-meta">{print.rarity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MtgSetIdentifier;
