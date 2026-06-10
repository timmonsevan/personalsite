import './MtgCard.css'

function MtgCard() {
  return (
    <div title="Random MTG Card" className="content-container">
      <h2>Random MTG Card</h2>
      <button className="btn-accent">Draw a card!</button>
      <div className="mtg-card-display" />
    </div>
  )
}

export default MtgCard
