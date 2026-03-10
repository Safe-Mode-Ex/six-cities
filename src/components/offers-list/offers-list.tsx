import cn from 'classnames';
import { Offer } from '../../types/offer.type';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
    offers: Offer[];
    isFavoritesScreen?: boolean;
    isOfferScreen?: boolean;
    setActiveOfferId?: (offerId: number | null) => void;
};

function OffersList({ offers, setActiveOfferId, isFavoritesScreen = false, isOfferScreen = false }: OffersListProps): JSX.Element {
  const handleOfferHover = (offerId: number | null) => {
    setActiveOfferId?.(offerId);
  };

  return (
    <div className={cn({
      'favorites__places': isFavoritesScreen,
      'places__list': !isFavoritesScreen,
      'near-places__list': isOfferScreen,
      'cities__places-list tabs__content': !isFavoritesScreen && !isOfferScreen,
    })}
    >
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
