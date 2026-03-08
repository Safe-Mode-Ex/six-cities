import { useState } from 'react';
import { Offer } from '../../types/offer.type';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
    offers: Offer[];
    isFavoritesScreen?: boolean;
    isOfferScreen?: boolean;
};

function OffersList({ offers, isFavoritesScreen = false, isOfferScreen = false }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  console.log(activeOfferId);

  const getClassName = () => {
    if (isFavoritesScreen) {
      return 'favorites__places';
    }

    if (isOfferScreen) {
      return 'near-places__list places__list';
    }

    return 'cities__places-list places__list tabs__content';
  };

  const handleOfferHover = (offerId: number | null) => {
    setActiveOfferId(offerId);
  };

  return (
    <div className={getClassName()}>
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
