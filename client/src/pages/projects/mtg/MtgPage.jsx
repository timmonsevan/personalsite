import { useState } from "react";
import "./MtgPage.css";
import MtgCard from "../../../components/mtg_components/MtgCard";
import CardBinder from "../../../components/mtg_components/CardBinder";
import MtgSetIdentifier from "../../../components/mtg_components/MtgSetIdentifier";

function MtgPage() {
  const [binderVersion, setBinderVersion] = useState(0);

  return (
    <div id="mtg-page" className="panel">
      <h2>MTG Card Binder</h2>
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
      <p>
        Gem City Games, my favorite local game store, asked for a form that
        allows them to search for a card and filter through all printings to
        determine what sets it's been printed in, to help them with card pulling
        as opposed to the multi-page list of shop entries that come back from
        TCGplayer.com et al.
      </p>
      <MtgSetIdentifier />
    </div>
  );
}

export default MtgPage;
