import { Offer } from '../../types/offer.type';
import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';

type PlacesProps = {
  offers: Offer[];
  setActiveOfferId: (activeOfferId: number | null) => void;
};

function Places({offers, setActiveOfferId}: PlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in Amsterdam</b>
      <Sort />
      <OffersList offers={offers} setActiveOfferId={setActiveOfferId} />
    </section>
  );
}

export default Places;
