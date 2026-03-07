import { useState } from 'react';
import { Offer } from '../../types/offer.type';
import OfferCard from '../offer-card/offer-card';
import Sort from '../sort/sort';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({offers}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  const handleOfferHover = (offerId: number | null) => {
    setActiveOfferId(offerId);
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in Amsterdam {activeOfferId}</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <OfferCard key={`${offer.id}`} offer={offer} onHover={handleOfferHover} />
        ))}
      </div>
    </section>
  );
}

export default OffersList;
