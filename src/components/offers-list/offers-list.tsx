import { useState } from 'react';
import { Offer } from '../../types/offer.type';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
    offers: Offer[];
    isFavoritesScreen: boolean;
};

function OffersList({ offers, isFavoritesScreen }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  const handleOfferHover = (offerId: number | null) => {
    setActiveOfferId(offerId);
  };

  return (
    <div className={isFavoritesScreen ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.id}`}
          offer={offer}
          onHover={handleOfferHover}
          isFavoritesScreen={isFavoritesScreen}
        />
      ))}
    </div>
  );
}

export default OffersList;
